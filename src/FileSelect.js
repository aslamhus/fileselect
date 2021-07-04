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
    this.initThemes();
    this.colors
      = options.colors
      || this.setColorTheme(options.theme)
      || this.themes.greyscale;
    this.svg = {
      default:
        '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file" class="svg-inline--fa fa-file fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"></path></svg>',
    };
    this.validateArguments(allowedTypes, options);
  }

  initThemes() {
    this.themes = {
      greyscale: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#92a5ab',
        textBg: '#6e7d82',
        text: '#FFFFFF',
      },
      blue: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#2B73BA',
        textBg: '#00458F',
        text: '#FFFFFF',
      },
      lightBlue: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#54cbed',
        textBg: '#4198b3',
        text: '#FFFFFF',
      },
      red: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#be4646',
        textBg: '#901d1d',
        text: '#FFFFFF',
      },
      green: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#00b36f',
        textBg: '#03763b',
        text: '#FFFFFF',
      },
      purple: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#a040b8',
        textBg: '#73178a',
        text: '#FFFFFF',
      },
      yellow: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#fed12e',
        textBg: '#bf9f30',
        text: '#FFFFFF',
      },
      black: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#000000',
        textBg: '#000000',
        text: '#FFFFFF',
      },
      white: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#ffffff',
        textBg: '#ffffff',
        text: '#000000',
      },
    };
  }

  setColorTheme(theme) {
    if (this.themes[theme]) {
      this.colors = this.themes[theme];
      return this.colors;
    }
    return null;
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
        : await this.createDefaultIcon(ext, this.colors);
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

  /**
   * Draw an icon on canvas
   * @param {String} ext - the file extension (to be drawn in the icon)
   * @param {Object} colors - color options for the icon
   * @param {String} colors.bg - bg behind icon color
   * @param {String} colors.iconBg - file icon bg color
   * @param {String} colors.textBg - text bg color
   * @param {String} colors.text - text color
   * @returns {Promise<Blob>}
   */
  createDefaultIcon(ext) {
    return new Promise((resolve) => {
      if (!this.colors) {
        this.colors = {
          bg: '#CCCCCC',
          iconBg: '#000000',
          textBg: '#333333',
          text: '#FFFFFF',
        };
      }
      const canvas = this.createCanvas();
      const ctx = canvas.getContext('2d');
      this.drawBg(canvas, ctx, this.colors.bg);
      this.drawIcon(canvas, ctx, this.colors.iconBg);
      this.drawTextBg(canvas, ctx, this.colors.textBg);
      this.drawText(canvas, ctx, ext, this.colors.text);
      // convert to blob
      canvas.toBlob((blob) => resolve(blob));
    });
  }

  static createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 384;
    canvas.height = 512;
    return canvas;
  }

  static drawBg(canvas, ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  static drawTextBg(canvas, ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(72, canvas.height - 190, 268, 120);
  }

  static drawText(canvas, ctx, ext, color) {
    ctx.fillStyle = color;
    ctx.font = '70px Arial';
    ctx.font
      = "normal normal normal normal 15px/28px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    ctx.font
      = "small-caps bold 80px 'HelveticaNeue',Helvetica,Arial,sans-serif";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'end';
    ctx.fillText(ext, 320, canvas.height - 190 + 60, 240);
  }

  static drawIcon(canvas, ctx, hexcolor, outline = false) {
    ctx.save();

    if (outline) {
      ctx.strokeStyle = hexcolor;
      ctx.lineWidth = 5;
    } else {
      ctx.lineWidth = 1;
    }

    ctx.miterLimit = 4;
    ctx.scale(0.75, 0.75);
    const x = (canvas.width - canvas.width * 0.75) * 0.75;
    const y = (canvas.height - canvas.height * 0.75) * 0.75;
    ctx.translate(x, y);
    ctx.scale(1, 1);
    ctx.save();
    ctx.fillStyle = hexcolor || '#000000';
    ctx.beginPath();
    ctx.moveTo(224, 136);
    ctx.lineTo(224, 0);
    ctx.lineTo(24, 0);
    ctx.bezierCurveTo(10.7, 0, 0, 10.7, 0, 24);
    ctx.lineTo(0, 488);
    ctx.bezierCurveTo(0, 501.3, 10.7, 512, 24, 512);
    ctx.lineTo(360, 512);
    ctx.bezierCurveTo(373.3, 512, 384, 501.3, 384, 488);
    ctx.lineTo(384, 160);
    ctx.lineTo(248, 160);
    ctx.bezierCurveTo(234.8, 160, 224, 149.2, 224, 136);
    ctx.closePath();
    ctx.moveTo(384, 121.9);
    ctx.lineTo(384, 128);
    ctx.lineTo(256, 128);
    ctx.lineTo(256, 0);
    ctx.lineTo(262.1, 0);
    ctx.bezierCurveTo(268.5, 0, 274.6, 2.5, 279.1, 7);
    ctx.lineTo(377, 105);
    ctx.bezierCurveTo(381.5, 109.5, 384, 115.6, 384, 121.9);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.restore();
  }

  static draw1(ctx, hexcolor) {
    ctx.save();
    ctx.strokeStyle = 'rgba(50,50,50,1)';
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 2;
    ctx.save();
    ctx.fillStyle = hexcolor || '#000000';
    ctx.beginPath();
    ctx.moveTo(369.9, 97.9);
    ctx.lineTo(286, 14);
    ctx.bezierCurveTo(277, 5, 264.8, -0.1, 252.1, -0.1);
    ctx.lineTo(48, -0.1);
    ctx.bezierCurveTo(21.5, 0, 0, 21.5, 0, 48);
    ctx.lineTo(0, 464);
    ctx.bezierCurveTo(0, 490.5, 21.5, 512, 48, 512);
    ctx.lineTo(336, 512);
    ctx.bezierCurveTo(362.5, 512, 384, 490.5, 384, 464);
    ctx.lineTo(384, 131.9);
    ctx.bezierCurveTo(384, 119.2, 378.9, 106.9, 369.9, 97.9);
    ctx.closePath();
    ctx.moveTo(332.1, 128);
    ctx.lineTo(256, 128);
    ctx.lineTo(256, 51.9);
    ctx.lineTo(332.1, 128);
    ctx.closePath();
    ctx.moveTo(48, 464);
    ctx.lineTo(48, 48);
    ctx.lineTo(208, 48);
    ctx.lineTo(208, 152);
    ctx.bezierCurveTo(208, 165.3, 218.7, 176, 232, 176);
    ctx.lineTo(336, 176);
    ctx.lineTo(336, 464);
    ctx.lineTo(48, 464);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.restore();
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
