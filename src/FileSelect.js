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
 * @param {Object} options.multiple
 *      - can multiple files be selected. By default set to true.
 * @param {Object} options.colors
 *      - icon colors. For more info see documentation at [createDefaultIcon]{@link createDefaultIcon}
 * @param {Object} options.theme
 *      - icon theme. For more info see documentation at [createDefaultIcon]{@link createDefaultIcon}
 * @param {Object} options.filesize
 *      - sets a filesize limit in bytes, default is 100000000 (~100 MB)
 * @param {Object} options.preview.backgroundImage
 *      - sets whether preview returns div element with background image (true) or img element (false) (default)
 */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { FileIcon } from '@aslamhus/fileicon';

export class FileSelect {
  constructor(
    allowedTypes = '*',
    options = {
      fileInput: true,
      onReaderProgress: null,
      onReadFileComplete: null,
      onInvalidType: null,
      multiple: null,
      colors: null,
      theme: null,
      filesize: null,
      preview: {
        backgroundImage: false,
      },
    }
  ) {
    this.fileIcon = new FileIcon({
      colors: options.colors,
      theme: options.theme,
    });
    this.svg = {
      //   default:
      //     '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file" class="svg-inline--fa fa-file fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"></path></svg>',
    };
    this.fileList = [];
    this.preview = options.preview;
    this.onInvalidType = options.onInvalidType;
    this.filesize = options.filesize || 100000000;
    this.multiple = options.multiple === false ? false : true;
    this.validateArguments(allowedTypes, options);
  }

  validateArguments(allowedTypes, { fileInput }) {
    if (fileInput) {
      // find fileInput tag, if not found create
      this.fileInput = fileInput;
      if (!this.fileInput?.tagName) {
        this.fileInput =
          document.querySelector(fileInput) ||
          document.querySelector('input[type=file]') ||
          this.createFileInput();
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
    if (this.multiple) this.fileInput.multiple = 'true';
    document.body.append(this.fileInput);

    return this.fileInput;
  }

  async fileSelected(e) {
    let file;
    if (e.target) {
      e.stopPropagation();
      e.preventDefault();
      [file] = e.target.files;
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
        reject(new Error('Invalid Argument Exception - no file element found.'));
      }
      // prevents firing twice in case <input> tag is nested within target element
      this.fileInput.onclick = (e) => e.stopPropagation();
      // handles files, resolves selectImage's promise when the files are read.
      this.fileInput.onchange = (e) => {
        const { files } = e.target;
        // add files to fileList
        this.fileList = [...this.fileList, ...files];
        // check each files type and size
        files.forEach((file) => {
          const types = this.checkFileTypes(file, this.allowedTypes);
          if (!types.valid) {
            reject(new Error(types.message));
          }
          if (file.size > this.filesize) {
            reject(new Error('Failed to select file, File size exceeded limit'));
          }
        });
        resolve(files);
      };
      // trigger file selection.
      this.fileInput.click();
    });
  }

  getFiles() {
    return this.fileList;
  }

  removeFiles() {
    this.fileList = [];
    return this.fileList;
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
        reject(new Error('Invalid Argument Exception. Expected instance of file.'));
      }
      const f = file;
      // give file a unique filename based on date
      f.uuid =
        file?.name !== undefined
          ? file?.name.replace(/(?=\.[^.]+$)/, `-${Date.now()}`)
          : Date.now();

      // check filetype is allowed
      const types = this.checkFileTypes(file, this.allowedTypes || allowedTypes);
      if (!types.valid) {
        reject(new Error(types.message));
      }
      // check file size is allowed
      if (file.size > this.filesize) {
        reject(new Error('Failed to handle file, File size exceeded limit'));
      }
      // read the file
      if (file.type.toLowerCase().includes('heic') || file.type.toLowerCase().includes('heif')) {
        // check if the file is HEIC type
        if (file.heicConvert) {
          // check if an Heic conversion has already taken place
          // or is in progress
          file.heicConvert.then((blob) => {
            const newFile = FileSelect.blobToFile(blob, file);
            this.readFile(newFile, resolve, reject);
          });
        } else {
          // convert the heic to jpeg
          file.heicConvert = FileSelect.getHEICBlob(file);
          file.heicConvert.then((blob) => {
            const newFile = FileSelect.blobToFile(blob, file);
            // read file
            this.readFile(newFile, resolve, reject);
          });
        }
      } else {
        // default read (non heic type)
        this.readFile(file, resolve, reject);
      }
    });
  }

  async getIcon(file, svg = false) {
    let icon;
    const [mimetype] = file.type.split('/');
    const ext = FileSelect.getExtensionFromFilename(file?.name);
    // if there is an SVG default icon or SVG icon for the file type, use that
    /* eslint no-prototype-builtins: "off" */
    if (this.svg.hasOwnProperty('default') || this.svg.hasOwnProperty(mimetype)) {
      // a default svg icon will always be used over specific types
      const svgIcon = this.svg.default || this.svg[mimetype];
      const svgBlob = await FileSelect.createSVGBlob(svgIcon);
      icon = document.createElement('img');
      icon.src = URL.createObjectURL(svgBlob);
      icon.onload = URL.revokeObjectURL(svgBlob);
    } else {
      // otherwise create default icon with @aslamhus/fileicon
      icon = await this.fileIcon.create(ext);
    }
    return icon;
  }

  /**
   * Gets a blob URL for the selected file.
   * @param {file object} file  - a selected file from the file input.
   * @returns {Element} an element of the appropriate type (image, video, pdf)
   */
  async getPreview(file) {
    if (!file || typeof file !== 'object' || !(file instanceof File)) {
      throw new Error('Type Error. getPreview expected file object');
    }
    let blob;
    const [mimetype, subtype] = file.type.split('/');
    // 1. Get blobs
    // if the type is not text/plain, image/heic, image, video or pdf
    // then create default svg file
    if (file.type === 'image/heic' || file.type === 'image/heif') {
      file.heicConvert = FileSelect.getHEICBlob(file);
      blob = await file.heicConvert;
      // attach converted file to fileObject:
      const newFile = FileSelect.blobToFile(blob, file);
      file.heicConvert = newFile;
    } else if (
      mimetype === 'image' ||
      mimetype === 'video' ||
      mimetype === 'audio' ||
      subtype === 'pdf' ||
      file.type === 'text/plain'
    ) {
      blob = file;
    } else {
      console.warn(`unrecognized file type: ${file.type}`);
      blob = null;
    }
    // 2. createObjectURL from blob
    let previewEl;
    let url = file;
    if (blob) {
      url = URL.createObjectURL(blob);
    } else {
      previewEl = FileSelect.createNoPreview();
    }
    // 3. create preview Element from URL object
    switch (mimetype) {
      case 'application':
        if (subtype === 'pdf') {
          const pdfBlob = await FileSelect.getPDF(url);
          if (this.preview.backgroundImage) {
            previewEl = FileSelect.createBackgroundImageDiv(pdfBlob, file.type);
          } else {
            previewEl = FileSelect.createImg(pdfBlob);
          }
        } else {
          // default for other application subtypes
          previewEl = FileSelect.createNoPreview();
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
          previewEl = FileSelect.createNoPreview();
        }
        break;

      case 'video':
        previewEl = document.createElement('video');
        previewEl.preload = 'none';
        previewEl.src = url;
        break;

      case 'audio':
        previewEl = FileSelect.createAudioElement(url, file.type);
        break;

      case 'image':
        if (this.preview.backgroundImage) {
          previewEl = FileSelect.createBackgroundImageDiv(url, file.type);
        } else {
          previewEl = FileSelect.createImg(url);
        }
        break;

      default:
        previewEl = FileSelect.createNoPreview();
    }
    // revokeObjectUrls onload (except for audio which is handled in the createAudioElement method
    if (previewEl && mimetype !== 'audio' && mimetype !== 'image' && mimetype !== 'application') {
      previewEl.onload = () => {
        URL.revokeObjectURL(url);
      };
    }
    if (previewEl) {
      // add mimetype and subtype to previewEl dataset
      previewEl.dataset.mimetype = mimetype;
      previewEl.dataset.subtype = subtype;
    }

    return previewEl;
  }

  static createImg(url) {
    const img = document.createElement('img');
    img.onload = () => {
      URL.revokeObjectURL(url);
    };
    img.src = url;

    return img;
  }

  static createNoPreview() {
    return null;
  }

  static createBackgroundImageDiv(url, type) {
    const div = document.createElement('div');
    div.dataset.src = url;
    div.dataset.type = type;
    div.style.backgroundImage = `url(${url})`;
    div.style.backgroundPosition = 'top left';
    div.style.backgroundSize = 'contain';
    div.style.backgroundRepeat = 'no-repeat';

    return div;
  }

  static createAudioElement(url, type) {
    const aud = document.createElement('audio');
    aud.controls = 'controls';
    aud.preload = 'metadata';
    aud.classList.add('test');
    aud.oncanplaythrough = () => {
      URL.revokeObjectURL(url);
    };
    aud.onplay = () => {
      document.querySelectorAll('audio').forEach((audio) => {
        if (audio !== aud) {
          audio.pause();
        }
      });
    };
    const src = document.createElement('source');
    src.src = url;
    src.type = type;
    aud.append(src);
    return aud;
  }

  static getExtensionFromFilename(filename) {
    return filename.match(/\.[0-9A-Z]+$/i);
  }

  static async getHEICBlob(file) {
    const { default: heic2any } = await import(/* webpackChunkName: "heic2any" */ 'heic2any');
    const blob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.5,
    })
      .then((result) => result)
      .catch((err) => {
        console.error(`Failed to get blob for heic file. Error: ${err}`);
        return false;
      });
    return blob;
  }

  static blobToFile(blob, file) {
    const ext = blob.type.split('/')[1];
    const newFilename = file.uuid.replace(/(HEIC)/, ext);
    const newFile = new File([blob], newFilename, { type: blob.type });
    newFile.uuid = newFilename;

    return newFile;
  }

  static createSVGBlob(svg) {
    return new Promise((resolve) => {
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      resolve(blob);
    });
  }

  static getPDF(url) {
    return new Promise((resolve) =>
      import(/* webpackChunkName: "pdfjs" */ 'pdfjs-dist/webpack').then((pdfjsLib) => {
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
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
              canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                resolve(url);
              });
            });
          });
        });
      })
    );
  }

  checkFileTypes({ type }, allowedTypes) {
    if (allowedTypes === '*') return { valid: true };
    const validObj = FileSelect.getTypeList(allowedTypes || this.allowedTypes);
    const mediaType = type.split('/')[0];
    if (validObj.types.includes(`${mediaType}/*`)) return { valid: true };
    if (validObj.types.includes(type)) {
      validObj.valid = true;
    } else {
      validObj.valid = false;
      // call optional client defined function
      if (this.onInvalidType instanceof Function) {
        this.onInvalidType.call(null, validObj);
      }
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
      if (e.lengthComputable) {
        var rprogress = parseInt((e.loaded / e.total) * 100, 10);
      }
      console.log('reader progress data', rprogress);
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
