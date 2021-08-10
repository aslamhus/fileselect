"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileSelect = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

var _fileicon = require("@aslamhus/fileicon");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FileSelect = /*#__PURE__*/function () {
  function FileSelect() {
    var allowedTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      fileInput: true,
      onReaderProgress: null,
      onReadFileComplete: null,
      onInvalidType: null,
      colors: null,
      theme: null,
      preview: {
        backgroundImage: false
      }
    };

    _classCallCheck(this, FileSelect);

    this.fileIcon = new _fileicon.FileIcon({
      colors: options.colors,
      theme: options.theme
    });
    this.svg = {//   default:
      //     '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file" class="svg-inline--fa fa-file fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"></path></svg>',
    };
    this.preview = options.preview;
    this.onInvalidType = options.onInvalidType;
    this.validateArguments(allowedTypes, options);
  }

  _createClass(FileSelect, [{
    key: "validateArguments",
    value: function validateArguments(allowedTypes, _ref) {
      var fileInput = _ref.fileInput;

      if (fileInput) {
        var _this$fileInput;

        // find fileInput tag, if not found create
        this.fileInput = fileInput;

        if (!((_this$fileInput = this.fileInput) !== null && _this$fileInput !== void 0 && _this$fileInput.tagName)) {
          this.fileInput = document.querySelector(fileInput) || document.querySelector('input[type=file]') || this.createFileInput();
        }
      } // get allowed types


      if (allowedTypes) this.allowedTypes = allowedTypes;else this.allowedTypes = '*';
    }
  }, {
    key: "createFileInput",
    value: function createFileInput() {
      this.fileInput = document.createElement('input');
      this.fileInput.type = 'file';
      this.fileInput.id = Date.now();
      this.fileInput.style.display = 'none';
      this.fileInput.multiple = 'true';
      document.body.append(this.fileInput);
      return this.fileInput;
    }
  }, {
    key: "fileSelected",
    value: function () {
      var _fileSelected = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var file, _e$target$files, fileRead;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (e.target) {
                  e.stopPropagation();
                  e.preventDefault();
                  _e$target$files = _slicedToArray(e.target.files, 1);
                  file = _e$target$files[0];
                } else {
                  file = e;
                }

                _context.next = 3;
                return this.handleFile(file, this.allowedTypes);

              case 3:
                fileRead = _context.sent;

                if (!fileRead) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", true);

              case 6:
                return _context.abrupt("return", true);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fileSelected(_x) {
        return _fileSelected.apply(this, arguments);
      }

      return fileSelected;
    }()
  }, {
    key: "select",
    value: function select() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!_this.fileInput) {
          reject(new Error('Invalid Argument Exception - no file element found.'));
        } // prevents firing twice in case <input> tag is nested within target element


        _this.fileInput.onclick = function (e) {
          return e.stopPropagation();
        }; // handles files, resolves selectImage's promise when the files are read.


        _this.fileInput.onchange = function (e) {
          var files = e.target.files; // check each file type is allowed

          files.forEach(function (file) {
            var types = _this.checkFileTypes(file, _this.allowedTypes);

            if (!types.valid) {
              reject(new Error(types.message));
            }
          });
          resolve(files);
        }; // trigger file selection.


        _this.fileInput.click();
      });
    }
  }, {
    key: "getFiles",
    value: function getFiles() {
      if (!this.fileInput) throw new Error('There are no files to get');
      return this.fileInput.files;
    }
  }, {
    key: "readFiles",
    value: function () {
      var _readFiles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(files) {
        var _this2 = this;

        var filesRead;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                filesRead = [];
                Object.values(files).forEach(function (file) {
                  filesRead.push(_this2.handleFile(file, _this2.allowedTypes));
                });
                _context2.next = 4;
                return Promise.all(filesRead);

              case 4:
                return _context2.abrupt("return", filesRead);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function readFiles(_x2) {
        return _readFiles.apply(this, arguments);
      }

      return readFiles;
    }()
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

  }, {
    key: "handleFile",
    value: function handleFile(file, allowedTypes) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (_typeof(file) !== 'object' || !(file instanceof File)) {
          reject(new Error('Invalid Argument Exception. Expected instance of file.'));
        }

        var f = file; // give file a unique filename based on date

        f.uuid = (file === null || file === void 0 ? void 0 : file.name) !== undefined ? file === null || file === void 0 ? void 0 : file.name.replace(/(?=\.[^.]+$)/, "-".concat(Date.now())) : Date.now(); // check filetype is allowed

        var types = _this3.checkFileTypes(file, _this3.allowedTypes || allowedTypes);

        if (!types.valid) {
          reject(new Error(types.message));
        } // read the file


        if (file.type.toLowerCase().includes('heic') || file.type.toLowerCase().includes('heif')) {
          // check if the file is HEIC type
          if (file.heicConvert) {
            // check if an Heic conversion has already taken place
            // or is in progress
            file.heicConvert.then(function (blob) {
              var newFile = FileSelect.blobToFile(blob, file);

              _this3.readFile(newFile, resolve, reject);
            });
          } else {
            // convert the heic to jpeg
            file.heicConvert = FileSelect.getHEICBlob(file);
            file.heicConvert.then(function (blob) {
              var newFile = FileSelect.blobToFile(blob, file); // read file

              _this3.readFile(newFile, resolve, reject);
            });
          }
        } else {
          // default read non heic type
          _this3.readFile(file, resolve, reject);
        }
      });
    }
  }, {
    key: "getIcon",
    value: function () {
      var _getIcon = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(file) {
        var svg,
            icon,
            _file$type$split,
            _file$type$split2,
            mimetype,
            ext,
            svgIcon,
            svgBlob,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                svg = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
                _file$type$split = file.type.split('/'), _file$type$split2 = _slicedToArray(_file$type$split, 1), mimetype = _file$type$split2[0];
                ext = FileSelect.getExtensionFromFilename(file === null || file === void 0 ? void 0 : file.name); // if there is an SVG default icon or SVG icon for the file type, use that

                /* eslint no-prototype-builtins: "off" */

                if (!(this.svg.hasOwnProperty('default') || this.svg.hasOwnProperty(mimetype))) {
                  _context3.next = 13;
                  break;
                }

                // a default svg icon will always be used over specific types
                svgIcon = this.svg["default"] || this.svg[mimetype];
                _context3.next = 7;
                return FileSelect.createSVGBlob(svgIcon);

              case 7:
                svgBlob = _context3.sent;
                icon = document.createElement('img');
                icon.src = URL.createObjectURL(svgBlob);
                icon.onload = URL.revokeObjectURL(svgBlob);
                _context3.next = 16;
                break;

              case 13:
                _context3.next = 15;
                return this.fileIcon.create(ext);

              case 15:
                icon = _context3.sent;

              case 16:
                return _context3.abrupt("return", icon);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getIcon(_x3) {
        return _getIcon.apply(this, arguments);
      }

      return getIcon;
    }()
    /**
     * Gets a blob URL for the selected file.
     * @param {file object} file  - a selected file from the file input.
     * @returns {Element} an element of the appropriate type (image, video, pdf)
     */

  }, {
    key: "getPreview",
    value: function () {
      var _getPreview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(file) {
        var blob, _file$type$split3, _file$type$split4, mimetype, subtype, newFile, url, previewEl, pdfBlob, text;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!file || _typeof(file) !== 'object' || !(file instanceof File))) {
                  _context4.next = 2;
                  break;
                }

                throw new Error('Type Error. getPreview expected file object');

              case 2:
                _file$type$split3 = file.type.split('/'), _file$type$split4 = _slicedToArray(_file$type$split3, 2), mimetype = _file$type$split4[0], subtype = _file$type$split4[1]; // 1. Get blobs
                // if the type is not text/plain, image/heic, image, video or pdf
                // then create default svg file

                if (!(file.type === 'image/heic' || file.type === 'image/heif')) {
                  _context4.next = 12;
                  break;
                }

                file.heicConvert = FileSelect.getHEICBlob(file);
                _context4.next = 7;
                return file.heicConvert;

              case 7:
                blob = _context4.sent;
                // attach converted file to fileObject:
                newFile = FileSelect.blobToFile(blob, file);
                file.heicConvert = newFile;
                _context4.next = 13;
                break;

              case 12:
                if (mimetype === 'image' || mimetype === 'video' || mimetype === 'audio' || subtype === 'pdf' || file.type === 'text/plain') {
                  blob = file;
                } else {
                  console.error("unrecognized file type: ".concat(file.type));
                  blob = file;
                }

              case 13:
                // 2. createObjectURL from blob
                url = file;
                if (blob) url = URL.createObjectURL(blob); // 3. create preview Element from URL object

                _context4.t0 = mimetype;
                _context4.next = _context4.t0 === 'application' ? 18 : _context4.t0 === 'text' ? 27 : _context4.t0 === 'video' ? 38 : _context4.t0 === 'audio' ? 42 : _context4.t0 === 'image' ? 44 : 46;
                break;

              case 18:
                if (!(subtype === 'pdf')) {
                  _context4.next = 25;
                  break;
                }

                _context4.next = 21;
                return FileSelect.getPDF(url);

              case 21:
                pdfBlob = _context4.sent;

                if (this.preview.backgroundImage) {
                  previewEl = FileSelect.createBackgroundImageDiv(pdfBlob, file.type);
                } else {
                  previewEl = FileSelect.createImg(pdfBlob);
                }

                _context4.next = 26;
                break;

              case 25:
                // default for other application subtypes
                previewEl = FileSelect.createNoPreview();

              case 26:
                return _context4.abrupt("break", 47);

              case 27:
                if (!(subtype === 'plain')) {
                  _context4.next = 36;
                  break;
                }

                _context4.next = 30;
                return file.text();

              case 30:
                text = _context4.sent;
                previewEl = document.createElement('div');
                previewEl.style.padding = '15px';
                previewEl.textContent = text;
                _context4.next = 37;
                break;

              case 36:
                // default for other text types i.e. rtf
                previewEl = FileSelect.createNoPreview();

              case 37:
                return _context4.abrupt("break", 47);

              case 38:
                previewEl = document.createElement('video');
                previewEl.preload = 'none';
                previewEl.src = url;
                return _context4.abrupt("break", 47);

              case 42:
                previewEl = FileSelect.createAudioElement(url, file.type);
                return _context4.abrupt("break", 47);

              case 44:
                if (this.preview.backgroundImage) {
                  previewEl = FileSelect.createBackgroundImageDiv(url, file.type);
                } else {
                  previewEl = FileSelect.createImg(url);
                }

                return _context4.abrupt("break", 47);

              case 46:
                previewEl = FileSelect.createNoPreview();

              case 47:
                // revokeObjectUrls onload (except for audio which is handled in the createAudioElement method
                if (previewEl && mimetype !== 'audio' && mimetype !== 'image' && mimetype !== 'application') {
                  previewEl.onload = function () {
                    URL.revokeObjectURL(url);
                  };
                }

                if (previewEl) {
                  // add mimetype and subtype to previewEl dataset
                  previewEl.dataset.mimetype = mimetype;
                  previewEl.dataset.subtype = subtype;
                }

                return _context4.abrupt("return", previewEl);

              case 50:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getPreview(_x4) {
        return _getPreview.apply(this, arguments);
      }

      return getPreview;
    }()
  }, {
    key: "checkFileTypes",
    value: function checkFileTypes(_ref2, allowedTypes) {
      var type = _ref2.type;
      if (allowedTypes === '*') return {
        valid: true
      };
      var validObj = FileSelect.getTypeList(allowedTypes || this.allowedTypes);
      var mediaType = type.split('/')[0];
      if (validObj.types.includes("".concat(mediaType, "/*"))) return {
        valid: true
      };

      if (validObj.types.includes(type)) {
        validObj.valid = true;
      } else {
        validObj.valid = false; // call optional client defined function

        if (this.onInvalidType instanceof Function) {
          this.onInvalidType.call(null, validObj);
        }
      }

      return validObj;
    }
  }, {
    key: "readFile",
    value: function readFile(file, resolve, reject) {
      var _this4 = this;

      var fileArray;
      var reader = new FileReader();

      reader.onprogress = function (e) {
        _this4.progress(e, file);
      };

      reader.onload = function (f) {
        return function (e) {
          var data = e.target.result;
          fileArray = {
            name: f.name,
            type: f.type,
            size: f.size,
            uuid: f.uuid,
            data: data
          };

          _this4.readFileComplete(fileArray);

          resolve(fileArray);
        };
      }(file);

      reader.onerror = function (e) {
        var errMsg;

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
  }, {
    key: "progress",
    value: function progress(e, file) {
      if (this.onReaderProgress instanceof Function) {
        this.onReaderProgress.call(file, e);
      }
    }
  }, {
    key: "readFileComplete",
    value: function readFileComplete(fileArray) {
      if (this.onFileReadComplete instanceof Function) {
        this.onFileReadComplete.call(this, fileArray);
      }
    }
  }], [{
    key: "createImg",
    value: function createImg(url) {
      var img = document.createElement('img');

      img.onload = function () {
        URL.revokeObjectURL(url);
      };

      img.src = url;
      return img;
    }
  }, {
    key: "createNoPreview",
    value: function createNoPreview() {
      return null;
    }
  }, {
    key: "createBackgroundImageDiv",
    value: function createBackgroundImageDiv(url, type) {
      var div = document.createElement('div');
      div.dataset.src = url;
      div.dataset.type = type;
      div.style.backgroundImage = "url(".concat(url, ")");
      div.style.backgroundPosition = 'top left';
      div.style.backgroundSize = 'contain';
      div.style.backgroundRepeat = 'no-repeat';
      return div;
    }
  }, {
    key: "createAudioElement",
    value: function createAudioElement(url, type) {
      var aud = document.createElement('audio');
      aud.controls = 'controls';
      aud.preload = 'metadata';
      aud.classList.add('test');

      aud.oncanplaythrough = function () {
        URL.revokeObjectURL(url);
      };

      aud.onplay = function () {
        document.querySelectorAll('audio').forEach(function (audio) {
          if (audio !== aud) {
            audio.pause();
          }
        });
      };

      var src = document.createElement('source');
      src.src = url;
      src.type = type;
      aud.append(src);
      return aud;
    }
  }, {
    key: "getExtensionFromFilename",
    value: function getExtensionFromFilename(filename) {
      return filename.match(/\.[0-9A-Z]+$/i);
    }
  }, {
    key: "getHEICBlob",
    value: function () {
      var _getHEICBlob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(file) {
        var _yield$import, heic2any, blob;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require('heic2any'));
                });

              case 2:
                _yield$import = _context5.sent;
                heic2any = _yield$import["default"];
                _context5.next = 6;
                return heic2any({
                  blob: file,
                  toType: 'image/jpg'
                }).then(function (result) {
                  return result;
                })["catch"](function (err) {
                  console.error("Failed to get blob for heic file. Error: ".concat(err));
                  return false;
                });

              case 6:
                blob = _context5.sent;
                return _context5.abrupt("return", blob);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getHEICBlob(_x5) {
        return _getHEICBlob.apply(this, arguments);
      }

      return getHEICBlob;
    }()
  }, {
    key: "blobToFile",
    value: function blobToFile(blob, file) {
      var ext = blob.type.split('/')[1];
      var newFilename = file.uuid.replace(/(HEIC)/, ext);
      var newFile = new File([blob], newFilename, {
        type: blob.type
      });
      newFile.uuid = newFilename;
      return newFile;
    }
  }, {
    key: "createSVGBlob",
    value: function createSVGBlob(svg) {
      return new Promise(function (resolve) {
        var blob = new Blob([svg], {
          type: 'image/svg+xml'
        });
        resolve(blob);
      });
    }
  }, {
    key: "getPDF",
    value: function getPDF(url) {
      return new Promise(function (resolve) {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('pdfjs-dist/webpack'));
        }).then(function (pdfjsLib) {
          if (typeof pdfjsLib === 'undefined') {
            throw new Error("couldn't initialize pdf.js library");
          }

          var loadingTask = pdfjsLib.getDocument(url);
          loadingTask.promise.then(function (pdf) {
            pdf.getPage(1).then(function (page) {
              var scale = 1;
              var viewport = page.getViewport({
                scale: scale
              });
              var canvas = document.createElement('canvas');
              canvas.style.cssText = "\n                          position:relative;\n                          width:100%;\n                          height:auto;\n                          margin:0px auto;\n                          top:50%;\n                          transform: translateY(-50%);";
              var context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              var renderContext = {
                canvasContext: context,
                viewport: viewport
              };
              var renderTask = page.render(renderContext);
              renderTask.promise.then(function () {
                canvas.toBlob(function (blob) {
                  var url = URL.createObjectURL(blob);
                  resolve(url);
                });
              });
            });
          });
        });
      });
    }
  }, {
    key: "getTypeList",
    value: function getTypeList(allowedTypes) {
      var aTypes = allowedTypes;

      if (typeof aTypes === 'string') {
        // convert string to array, i.e. allowedTypes = "image/jpeg" => ["image/jpeg"]
        aTypes = [aTypes];
      }

      var types = aTypes.map(function (type) {
        return type;
      });
      var typeArray = [];
      var messageArray = []; // push remaining types

      if (types.length > 0) {
        Object.values(types).forEach(function (type) {
          typeArray.push(type);
          var mimeType = type.split('/');
          messageArray.push(".".concat(mimeType[1]));
        });
      }

      var message = messageArray.reduce(function (acc, cur, index) {
        var msg;
        if (index === 0) msg = acc + cur;else if (index === messageArray.length - 1) msg = "".concat(acc, " or ").concat(cur);else msg = "".concat(acc, ", ").concat(cur);
        return msg;
      }, 'File type must be ');
      return {
        message: message,
        types: typeArray
      };
    }
  }]);

  return FileSelect;
}();

exports.FileSelect = FileSelect;
