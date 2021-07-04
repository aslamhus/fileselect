/* eslint-disable default-case */
/* eslint-disable comma-dangle */
/**
 * File Select
 * v 1.0.4
 *
 * Documentation: https://github.com/aslamhus/fileselect
 *
 *
 * @param {String | String[]} allowedTypes
 *      - What file types are allowed. * for everything, or array of mime types.
 * @param {Object} options
 *      - options for file select.
 * @param {String | Element} options.fileInput
 *      - a selector for a file input element or a DOM element.
 * @param {Function} options.onReaderProgress
 *      - a client defined function to be called for the filereader progress event
 * @param {Function} options.onReadFileComplete
 *      - a client defined function to be called when the file has been read.
 * @param {Function} options.onInvalidType
 *      - a client defined function to be called when there is an invalid type
 * @param {Function} options.iconColors
 *      icon colors. For more info see documentation at [createDefaultIcon]{@link createDefaultIcon}
 */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import FileIcon from './FileIcon';

class FileSelect {
  constructor(
    allowedTypes = '*',
    options = {
      fileInput: true,
      onReaderProgress: null,
      onReadFileComplete: null,
      onInvalidType: null,
      colors: null,
      theme: null,
    }
  ) {
    this.fileIcon = new FileIcon(options.colors, options.theme);
    this.svg = {
      default:
        '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file" class="svg-inline--fa fa-file fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"></path></svg>',
    };
    this.validateArguments(allowedTypes, options);
  }

  validateArguments(allowedTypes, { fileInput }) {
    if (fileInput) {
      // find fileInput tag, if not found create
      this.fileInput = fileInput;
      if (!this.fileInput?.tagName) {
        this.fileInput
          = document.querySelector(fileInput)
          || document.querySelector('input[type=file]')
          || this.createFileInput();
      }
    }
    // get allowed types
    if (allowedTypes) this.allowedTypes = allowedTypes;
    else this.allowedTypes = '*';
  }

  createFileInput() {
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.id = Date.now();
    this.fileInput.style.display = 'none';
    this.fileInput.multiple = 'true';
    document.body.append(this.fileInput);

    return this.fileInput;
  }

  async fileSelected(e) {
    let file;
    if (e.target) {
      e.stopPropagation();
      e.preventDefault();
      [file] = e.target.files;
      alert('file!');
      console.log('file', file);
    } else {
      file = e;
    }
    const fileRead = await this.handleFile(file, this.allowedTypes);
    if (fileRead) {
      return true;
    }
    return true;
  }

  select() {
    return new Promise((resolve, reject) => {
      if (!this.fileInput) {
        console.error("Couldn't find file input element.");
        reject(
          new Error('Invalid Argument Exception - no file element found.')
        );
      }
      // prevents firing twice in case <input> tag is nested within target element
      this.fileInput.onclick = (e) => e.stopPropagation();
      // handles files, resolves selectImage's promise when the files are read.
      this.fileInput.onchange = (e) => {
        const { files } = e.target;
        resolve(files);
      };
      // trigger file selection.
      this.fileInput.click();
    });
  }

  getFiles() {
    if (!this.fileInput) throw new Error('There are no files to get');
    return this.fileInput.files;
  }

  async readFiles(files) {
    const filesRead = [];
    Object.values(files).forEach((file) => {
      filesRead.push(this.handleFile(file, this.allowedTypes));
    });
    await Promise.all(filesRead);
    return filesRead;
  }

  /**
   * Handle the image.
   * Summary.
   * 1) Add unique filename (re)Check the file types are valid.
   * 2) Read and return a file object with the data:URL.
   * @param {File} file
   *    - the file object to be handled. Must be instance of file
   * @param {String | String[]} allowedTypes
   *    - file types allowed. Example: [ 'image/jpeg', 'application/pdf' ]
   * @returns {Promise}
   *    - a promise that resolves when the file has been read.
   */
  handleFile(file, allowedTypes) {
    return new Promise((resolve, reject) => {
      if (typeof file !== 'object' || !(file instanceof File)) {
        reject(
          new Error('Invalid Argument Exception. Expected instance of file.')
        );
      }
      const f = file;
      // give file a unique filename based on date
      f.uuid
        = file.name !== undefined
          ? file.name.replace(/(?=\.[^.]+$)/, `-${Date.now()}`)
          : Date.now();
      // check filetype is allowed

      const checkType = this.checkFileTypes(
        file,
        this.allowedTypes || allowedTypes
      );
      if (!checkType.valid) {
        resolve(checkType);
      }
      // read the file
      this.readFile(file, resolve, reject);
    });
  }

  /**
   * Gets a blob URL for the selected file.
   * If the file is a PDF or a TEXT file, it returns a predetermined svg icon (as a blob url)
   * @param {file object} file  - a selected file from the file input.
   * @returns {Element} an element of the appropriate type (image, video, pdf)
   */
  async getPreview(file) {
    if (!file || typeof file !== 'object' || !(file instanceof File)) {
      throw new Error('Type Error. getPreview expected file object');
    }
    const previewObj = {
      preview: null,
      icon: null,
    };
    let blob;
    const [mimetype, subtype] = file.type.split('/');
    // 1. Get blobs
    // if the type is not text/plain, image/heic, image, video or pdf
    // then create default svg file
    if (
      mimetype === 'image'
      || mimetype === 'video'
      || subtype === 'pdf'
      || file.type === 'text/plain'
    ) {
      blob = file;
    } else if (file.type === 'image/heic' || file.type === 'image/heif') {
      blob = await FileSelect.getHEICBlob(file);
    }
    // 2. createObjectURL from blob
    let url;
    if (blob) url = URL.createObjectURL(blob);
    // 3. create preview Element from URL object
    let previewEl;
    switch (mimetype) {
      case 'application':
        if (subtype === 'pdf') {
          previewEl = await this.getPDF(url);
        } else {
          // default for other application types
        }
        break;

      case 'text':
        if (subtype === 'plain') {
          const text = await file.text();
          previewEl = document.createElement('div');
          previewEl.style.padding = '15px';
          previewEl.textContent = text;
        } else {
          // default for other text types i.e. rtf
        }
        break;

      case 'video':
        previewEl = document.createElement('video');
        previewEl.src = url;
        break;

      case 'image':
        previewEl = document.createElement('img');
        previewEl.src = url;
        break;
    }
    // 4. Create icon
    // if the client has added an icon for the file type, use it
    // otherwise return the default icon
    const ext = FileSelect.getExtensionFromFilename(file.name);
    const iconBlob
      = this.svg[file.type] !== undefined
        ? await FileSelect.createSVGBlob(this.svg[file.type])
        : await this.fileIcon.createIcon(ext);
    const iconSrc = URL.createObjectURL(iconBlob);
    const iconEl = document.createElement('img');
    iconEl.src = iconSrc;
    // add onload callback to revokeObjectUrls
    previewEl.onload = URL.revokeObjectURL(url);
    iconEl.onload = URL.revokeObjectURL(iconBlob);
    // 5. Return preview object with preview and icon properties
    previewObj.preview = previewEl;
    previewObj.icon = iconEl;
    return previewObj;
  }

  static getExtensionFromFilename(filename) {
    return filename.match(/\.[0-9A-Z]+$/i);
  }

  static async getHEICBlob(file) {
    const { default: heic2any } = await import(
      /* webpackChunkName: "heic2any" */ 'heic2any'
    );
    const blob = await heic2any({
      blob: file,
      toType: 'image/jpg',
    })
      .then((result) => result)
      .catch((err) => {
        console.error(`Failed to get blob for heic file. Error: ${err}`);
        return false;
      });
    return blob;
  }

  static createSVGBlob(svg) {
    return new Promise((resolve) => {
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      resolve(blob);
    });
  }

  static getPDF(url) {
    return new Promise((resolve) => import(/* webpackChunkName: "pdjs" */ 'pdfjs-dist/webpack').then(
      (pdfjsLib) => {
        if (typeof pdfjsLib === 'undefined') {
          throw new Error("couldn't initialize pdf.js library");
        }
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then((pdf) => {
          pdf.getPage(1).then((page) => {
            const scale = 1;
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            canvas.style.cssText = `
                          position:relative;
                          width:100%;
                          height:auto;
                          margin:0px auto;
                          top:50%;
                          transform: translateY(-50%);`;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context,
              viewport,
            };
            page.render(renderContext);
            resolve(canvas);
          });
        });
      }
    ));
  }

  checkFileTypes({ type }, allowedTypes) {
    if (allowedTypes === '*') return { valid: true };
    const validObj = this.getTypeList(allowedTypes || this.allowedTypes);
    const mediaType = type.split('/')[0];
    if (validObj.types.includes(`${mediaType}/*`)) return { valid: true };
    if (validObj.types.includes(type)) {
      validObj.valid = true;
    } else {
      validObj.valid = false;
      // call optional client defined function
      if (this.onInvalidType instanceof Function) {
        this.onInvalidType.call(validObj, validObj.message);
      } else console.error(validObj.message);
    }
    return validObj;
  }

  static getTypeList(allowedTypes) {
    let aTypes = allowedTypes;
    if (typeof aTypes === 'string') {
      // convert string to array, i.e. allowedTypes = "image/jpeg" => ["image/jpeg"]
      aTypes = [aTypes];
    }
    const types = aTypes.map((type) => type);
    const typeArray = [];
    const messageArray = [];
    // push remaining types
    if (types.length > 0) {
      Object.values(types).forEach((type) => {
        typeArray.push(type);
        const mimeType = type.split('/');
        messageArray.push(`.${mimeType[1]}`);
      });
    }

    const message = messageArray.reduce((acc, cur, index) => {
      let msg;
      if (index === 0) msg = acc + cur;
      else if (index === messageArray.length - 1) msg = `${acc} or ${cur}`;
      else msg = `${acc}, ${cur}`;
      return msg;
    }, 'File type must be ');

    return { message, types: typeArray };
  }

  readFile(file, resolve, reject) {
    let fileArray;
    const reader = new FileReader();
    reader.onprogress = (e) => {
      this.progress(e, file);
    };
    reader.onload = ((f) => (e) => {
      const data = e.target.result;
      fileArray = {
        name: f.name,
        type: f.type,
        size: f.size,
        uuid: f.uuid,
        data,
      };
      this.readFileComplete(fileArray);
      resolve(fileArray);
    })(file);

    reader.onerror = (e) => {
      let errMsg;
      switch (e.target.error.code) {
        case e.target.error.NOT_FOUND_ERR:
          errMsg = 'File not found!';
          break;

        case e.target.error.NOT_READABLE_ERR:
          errMsg = 'File not readable!';
          break;

        case e.target.error.ABORT_ERR:
          errMsg = 'Read operation was aborted!';
          break;

        case e.target.error.SECURITY_ERR:
          errMsg = 'File is in a locked state!';
          break;

        case e.target.error.ENCODING_ERR:
          errMsg = 'The file is too long to encode in a "data://" URL.';
          break;

        default:
          errMsg = 'Read error.';
      }
      console.error('Read File Error:', errMsg);
      reject(errMsg);
    };
    reader.readAsDataURL(file);
  }

  progress(e, file) {
    if (this.onReaderProgress instanceof Function) {
      this.onReaderProgress.call(file, e);
    }
  }

  readFileComplete(fileArray) {
    if (this.onFileReadComplete instanceof Function) {
      this.onFileReadComplete.call(this, fileArray);
    }
  }
}

export default FileSelect;
