"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

/**
 * File Select 
 * an updated version of Image Select
 * v 1.0 
 * Last Edited June 2021
 * 
 * Dependencies (dynamically imported):
 *  - heic2any documentation https://alexcorvi.github.io/heic2any/
 *  - pdfjs cdn('https://cdn.jsdelivr.net/npm/pdfjs-dist@2.8.335/build/pdf.min.js')
 * 
 * Description.
 * 
 * 
 * @property {string} this.fileInput - selector for file upload input <input type='file'> 
 *                                   - if flag NO_INPUT is passed, then file select will not create or try to find an input tag.
 * @property {array} allowedTypes - The allowed file types. 
 *                
 * @property {function} onReaderProgress - a client defined function to be called for the filereader progress                
 * @property {function} onReadFileComplete - a client defined function to be called when the file has been read.                
 *
 */

/** Babel imports required to avoid regenerator runtime error **/
class FileSelect {
  constructor(allowedTypes = '*', options = {
    fileInput: true,
    onReaderProgress: null,
    onReadFileComplete: null,
    onInvalidType: null
  }) {
    this.imageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/tif', 'image/tiff', 'image/gif', 'image/bmp', 'image/heif', 'image/heic'];
    this.videoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'ideo/x-flv', 'video/3gpp', 'video/MP2T', 'video/ogg', 'video/x-m4v'];
    this.svg = {
      pdf: '<svg focusable="false" data-prefix="far" data-icon="file-pdf" class="svg-inline--fa fa-file-pdf fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5-17.2-10.5-28.7-25-36.8-46.3 3.9-16.1 10.1-40.6 5.4-56-4.2-26.2-37.8-23.6-42.6-5.9-4.4 16.1-.4 38.5 7 67.1-10 23.9-24.9 56-35.4 74.4-20 10.3-47 26.2-51 46.2-3.3 15.8 26 55.2 76.1-31.2 22.4-7.4 46.8-16.5 68.4-20.1 18.9 10.2 41 17 55.8 17 25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7 8.3 15.1 18.9 27.2 30.1 35.5-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z"></path></svg>',
      text: '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file-alt" class="svg-inline--fa fa-file-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z"></path></svg>'
    };
    this.validateArguments(allowedTypes, options);
  }

  validateArguments(allowedTypes, {
    fileInput
  }) {
    if (fileInput) {
      var _this$fileInput;

      // find fileInput tag, if not found create
      this.fileInput = fileInput;
      if (!((_this$fileInput = this.fileInput) !== null && _this$fileInput !== void 0 && _this$fileInput.tagName)) this.fileInput = document.querySelector(fileInput) || document.querySelector('input[type=file]') || this.createFileInput();
    } // get allowed types


    if (allowedTypes) this.allowedTypes = allowedTypes;else this.allowedTypes = '*';
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
      file = e.target.files[0];
    } else {
      file = e;
    }

    let fileRead = await this.handleFile(file, this.allowedTypes);

    if (fileRead) {
      return true;
    }

    return true;
  }
  /**
   * Select 
   * @returns 
   */


  select() {
    return new Promise((resolve, reject) => {
      if (!this.fileInput) {
        console.error("Couldn't find file input element.");
        reject(false);
      } // prevents firing twice in case <input> tag is nested within target element 


      this.fileInput.onclick = e => e.stopPropagation(); // handles files, resolves selectImage's promise when the files are read.


      this.fileInput.onchange = e => resolve(e); // begins the file selection.


      this.fileInput.click();
    });
  }

  getFiles() {
    if (!this.fileInput) throw "There are no files to get";
    return this.fileInput.files;
  }

  async readFiles({
    target: {
      files: files
    }
  }, resolve, reject) {
    let filesRead = [];

    for (let file of files) {
      let read = await this.handleFile(file, this.allowedTypes);
      if (read) filesRead.push(read);
    }

    ;
    resolve(filesRead);
  }

  uuidv4() {
    // Unique Id generator for image filename avoids duplicates
    //    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    //    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    //    )
    return Date.now();
  }
  /**
   * Handle the image.
   * Summary. 
   * 1) Check the file types are valid.
   * 2) Read and return the read file object.
   * @file - the file object to be handled
   * @allowedTypes {array} allowedTypes - file types allowed. Example: [ 'image/jpeg', 'application/pdf' ] 'image/*' allows all image types
   * returns {promise} - a promise  that resolves to the read file object.
   */


  handleFile(file, allowedTypes) {
    return new Promise((resolve, reject) => {
      if (typeof file !== 'object' || !(file instanceof File)) reject('Invalid Argument Exception. Expected instance of file.');
      let uniqueFilename;
      if (file.name !== undefined) uniqueFilename = file.name.replace(/(?=\.[^.]+$)/, '-' + this.uuidv4());else uniqueFilename = this.uuidv4();
      file.uuid = uniqueFilename;
      let checkType = this.checkFileTypes(file, allowedTypes);
      if (!checkType.valid) return checkType; // readFile will resolve/recect handleFile, so we pass the resolve argument along.

      this.readFile(file, resolve, reject);
    });
  }
  /**
   * Gets a blob URL for the selected file.
   * If the file is a PDF or a TEXT file, it returns a predetermined svg icon (as a blob url)
   * @param {file object} file  - a selected file from the file input. 
   * @returns blob URL
   */


  async getPreview(file) {
    let blob;
    if (!file || typeof file !== 'object' || !(file instanceof File)) throw "Type Error. getPreview expected file object"; // if(file.type.includes('pdf'))
    //     blob = await this.createSVGBlob(this.svg.pdf);
    // else if(file.type.includes('text'))

    if (file.type.includes('text')) blob = await this.createSVGBlob(this.svg.text);else if (file.type.includes('heic')) {
      blob = await this.getHEICBlob(file);
    } else {
      blob = file;
    }
    if (!blob) return null;
    let url = URL.createObjectURL(blob);

    if (file.type.includes('pdf')) {
      let canvas = await this.getPDF(url);
      return canvas;
    } else if (file.type.includes('video')) {
      const video = document.createElement('video');
      video.src = url;
      return video;
    } else if (file.type.includes('image')) {
      const image = document.createElement('img');
      image.src = url;
      return image;
    } else if (file.type.includes('text')) {// unhandled
      // console.log('text blob', blob)
    }
  }

  async getHEICBlob(file) {
    const {
      default: heic2any
    } = await import(
    /* webpackChunkName: "heic2any" */
    'heic2any'); // console.log('%cheic2any', 'color: blue')
    // console.log(file)
    // console.log(heic2any);

    const blob = await heic2any({
      blob: file,
      toType: "image/jpg"
    }).then(result => result).catch(e => {
      console.error('Failed to get blob for heic file.');
      return false;
    });
    console.log('heic blob', blob);
    return blob;
  }

  getPDF(url) {
    return new Promise(async resolve => {
      const pdfjsLib = await import(
      /* webpackChunkName: "pdjs" */
      'pdfjs-dist/webpack');
      if (typeof pdfjsLib == undefined) throw "couldn't initialize pdf.js library";
      const loadingTask = pdfjsLib.getDocument(url);
      loadingTask.promise.then(function (pdf) {
        pdf.getPage(1).then(function (page) {
          var scale = 1;
          var viewport = page.getViewport({
            scale: scale
          });
          let canvas = document.createElement('canvas');
          canvas.style.cssText = `
                        position:relative;
                        width:100%;
                        height:auto;
                        margin:0px auto;
                        top:50%;
                        transform: translateY(-50%);`;
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          page.render(renderContext);
          resolve(canvas);
        });
      });
    });
  }

  createSVGBlob(svg) {
    return new Promise(resolve => {
      const blob = new Blob([svg], {
        type: 'image/svg+xml'
      });
      resolve(blob);
    });
  }

  checkFileTypes({
    type
  }, allowedTypes) {
    if (allowedTypes === '*') return {
      valid: true
    }; //    if(allowedTypes.contains("*")){
    //        // if 
    //        let starType = allowedTypes.split("/")[0];
    //        if (type.contains(starType)){
    //            return { valid : true}
    //        }
    //        return false;
    //    }

    const validObj = this.parseTypes(allowedTypes);

    if (!validObj.types.includes(type)) {
      // call optional client defined function
      if (this.onInvalidType instanceof Function) this.onInvalidType.call(validObj, validObj.message);else console.error(validObj.message);
      validObj.valid = false;
    } else {
      validObj.valid = true;
    }

    return validObj;
  }

  parseTypes(allowedTypes) {
    let types = allowedTypes.map(type => type);
    let typeArray = [],
        messageArray = [];
    let allImageTypes = types.indexOf('image/*');

    if (allImageTypes > -1) {
      typeArray.push(...this.imageTypes);
      types.splice(allImageTypes, 1);
      messageArray.push('an image');
    }

    let allVideoTypes = types.indexOf('video/*');

    if (allVideoTypes > -1) {
      typeArray.push(...this.videoTypes);
      types.splice(allVideoTypes, 1);
      messageArray.push('a video');
    } // push remaining types


    if (types.length > 0) {
      for (let type of types) {
        typeArray.push(type);
        let mimeType = type.split('/');
        messageArray.push(`.${mimeType[1]}`);
      }
    }

    let message = messageArray.reduce((acc, cur, index) => {
      if (index == 0) {
        return acc += cur;
      } else if (index == messageArray.length - 1) {
        return acc += ` or ${cur}`;
      }

      return acc += `, ${cur}`;
    }, 'File type must be ');
    return {
      message: message,
      types: typeArray
    };
  }

  readFile(file, resolve, reject) {
    let fileArray;
    var reader = new FileReader();

    reader.onprogress = e => {
      this.progress(e, file);
    };

    reader.onload = (file => {
      return e => {
        let data = e.target.result;
        fileArray = {
          name: file.name,
          type: file.type,
          size: file.size,
          uuid: file.uuid,
          // id : file.id,
          data: data
        };
        this.readFileComplete(fileArray); // call optional onReadFileComplete

        resolve(fileArray);
      };
    })(file);

    reader.onerror = e => {
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

      console.error("Read File Error:", errMsg);
      reject(errMsg);
    };

    reader.readAsDataURL(file);
  }

  progress(e, file) {
    if (this.onReaderProgress instanceof Function) this.onReaderProgress.call(file, e);
  }

  readFileComplete(fileArray) {
    if (this.onFileReadComplete instanceof Function) this.onFileReadComplete.call(this, fileArray);
  }
  /**
   * 
   * @param {object} icons an object of icon images to be served by getPreview
   * @property {string} icons.pdf 
   * @property {string} icons.text 
   */


}

var _default = FileSelect;
exports.default = _default;
