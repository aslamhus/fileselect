"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FileSelect = /*#__PURE__*/function () {
  function FileSelect() {
    var allowedTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      fileInput: null,
      onReaderProgress: null,
      onReadFileComplete: null,
      onInvalidType: null
    };

    _classCallCheck(this, FileSelect);

    this.imageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/tif', 'image/tiff', 'image/gif', 'image/bmp', 'image/heif', 'image/heic'];
    this.videoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'ideo/x-flv', 'video/3gpp', 'video/MP2T', 'video/ogg', 'video/x-m4v'];
    this.svg = {
      pdf: '<svg focusable="false" data-prefix="far" data-icon="file-pdf" class="svg-inline--fa fa-file-pdf fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5-17.2-10.5-28.7-25-36.8-46.3 3.9-16.1 10.1-40.6 5.4-56-4.2-26.2-37.8-23.6-42.6-5.9-4.4 16.1-.4 38.5 7 67.1-10 23.9-24.9 56-35.4 74.4-20 10.3-47 26.2-51 46.2-3.3 15.8 26 55.2 76.1-31.2 22.4-7.4 46.8-16.5 68.4-20.1 18.9 10.2 41 17 55.8 17 25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7 8.3 15.1 18.9 27.2 30.1 35.5-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z"></path></svg>',
      text: '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file-alt" class="svg-inline--fa fa-file-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z"></path></svg>'
    };
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
        if (!((_this$fileInput = this.fileInput) !== null && _this$fileInput !== void 0 && _this$fileInput.tagName)) this.fileInput = document.querySelector(fileInput) || document.querySelector('input[type=file]') || this.createFileInput();
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
        var file, fileRead;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (e.target) {
                  e.stopPropagation();
                  e.preventDefault();
                  file = e.target.files[0];
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
    /**
     * Select 
     * @returns 
     */

  }, {
    key: "select",
    value: function select() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!_this.fileInput) {
          console.error("Couldn't find file input element");
          reject(false);
        } // prevents firing twice in case <input> tag is nested within target element 


        _this.fileInput.onclick = function (e) {
          return e.stopPropagation();
        }; // handles files, resolves selectImage's promise when the files are read.


        _this.fileInput.onchange = function (e) {
          return _this.readFiles(e, resolve, reject);
        }; // begins the file selection.


        _this.fileInput.click();
      });
    }
  }, {
    key: "readFiles",
    value: function () {
      var _readFiles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2, resolve, reject) {
        var files, filesRead, _iterator, _step, file, read;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                files = _ref2.target.files;
                filesRead = [];
                _iterator = _createForOfIteratorHelper(files);
                _context2.prev = 3;

                _iterator.s();

              case 5:
                if ((_step = _iterator.n()).done) {
                  _context2.next = 13;
                  break;
                }

                file = _step.value;
                _context2.next = 9;
                return this.handleFile(file, this.allowedTypes);

              case 9:
                read = _context2.sent;
                if (read) filesRead.push(read);

              case 11:
                _context2.next = 5;
                break;

              case 13:
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](3);

                _iterator.e(_context2.t0);

              case 18:
                _context2.prev = 18;

                _iterator.f();

                return _context2.finish(18);

              case 21:
                ;
                resolve(filesRead);

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 15, 18, 21]]);
      }));

      function readFiles(_x2, _x3, _x4) {
        return _readFiles.apply(this, arguments);
      }

      return readFiles;
    }()
  }, {
    key: "uuidv4",
    value: function uuidv4() {
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

  }, {
    key: "handleFile",
    value: function handleFile(file, allowedTypes) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var uniqueFilename;
        if (file.name !== undefined) uniqueFilename = file.name.replace(/(?=\.[^.]+$)/, '-' + _this2.uuidv4());else uniqueFilename = _this2.uuidv4();
        file.uuid = uniqueFilename;

        var checkType = _this2.checkFileTypes(file, allowedTypes);

        if (!checkType.valid) return checkType; // readFile will resolve/recect handleFile, so we pass the resolve argument along.

        _this2.readFile(file, resolve, reject);
      });
    }
    /**
     * Gets a blob URL for the selected file.
     * If the file is a PDF or a TEXT file, it returns a predetermined svg icon (as a blob url)
     * @param {file object} file  - a selected file from the file input. 
     * @returns blob URL
     */

  }, {
    key: "getPreview",
    value: function () {
      var _getPreview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(file) {
        var blob, url, canvas, video, image;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (file) {
                  _context3.next = 2;
                  break;
                }

                throw "Type Error. getPreview expected file object";

              case 2:
                if (!file.type.includes('text')) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 5;
                return this.createSVGBlob(this.svg.text);

              case 5:
                blob = _context3.sent;
                _context3.next = 15;
                break;

              case 8:
                if (!file.type.includes('heic')) {
                  _context3.next = 14;
                  break;
                }

                _context3.next = 11;
                return this.getHEICBlob(file);

              case 11:
                blob = _context3.sent;
                _context3.next = 15;
                break;

              case 14:
                blob = file;

              case 15:
                if (blob) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt("return", null);

              case 17:
                url = URL.createObjectURL(blob);

                if (!file.type.includes('pdf')) {
                  _context3.next = 25;
                  break;
                }

                _context3.next = 21;
                return this.getPDF(url);

              case 21:
                canvas = _context3.sent;
                return _context3.abrupt("return", canvas);

              case 25:
                if (!file.type.includes('video')) {
                  _context3.next = 31;
                  break;
                }

                video = document.createElement('video');
                video.src = url;
                return _context3.abrupt("return", video);

              case 31:
                if (!file.type.includes('image')) {
                  _context3.next = 37;
                  break;
                }

                image = document.createElement('img');
                image.src = url;
                return _context3.abrupt("return", image);

              case 37:
                if (file.type.includes('text')) {// unhandled
                  // console.log('text blob', blob)
                }

              case 38:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPreview(_x5) {
        return _getPreview.apply(this, arguments);
      }

      return getPreview;
    }()
  }, {
    key: "getHEICBlob",
    value: function () {
      var _getHEICBlob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(file) {
        var _yield$import, heic2any, blob;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require('heic2any'));
                });

              case 2:
                _yield$import = _context4.sent;
                heic2any = _yield$import["default"];
                _context4.next = 6;
                return heic2any({
                  blob: file,
                  toType: "image/jpg"
                }).then(function (result) {
                  return result;
                })["catch"](function (e) {
                  console.error('Failed to get blob for heic file.');
                  return false;
                });

              case 6:
                blob = _context4.sent;
                console.log('heic blob', blob);
                return _context4.abrupt("return", blob);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getHEICBlob(_x6) {
        return _getHEICBlob.apply(this, arguments);
      }

      return getHEICBlob;
    }()
  }, {
    key: "getPDF",
    value: function getPDF(url) {
      return new Promise( /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve) {
          var pdfjsLib, loadingTask;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return Promise.resolve().then(function () {
                    return _interopRequireWildcard(require('pdfjs-dist/webpack'));
                  });

                case 2:
                  pdfjsLib = _context5.sent;

                  if (!(_typeof(pdfjsLib) == undefined)) {
                    _context5.next = 5;
                    break;
                  }

                  throw "couldn't initialize pdf.js library";

                case 5:
                  loadingTask = pdfjsLib.getDocument(url);
                  loadingTask.promise.then(function (pdf) {
                    pdf.getPage(1).then(function (page) {
                      var scale = 1;
                      var viewport = page.getViewport({
                        scale: scale
                      });
                      var canvas = document.createElement('canvas');
                      canvas.style.cssText = "\n                        position:relative;\n                        width:100%;\n                        height:auto;\n                        margin:0px auto;\n                        top:50%;\n                        transform: translateY(-50%);";
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

                case 7:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x7) {
          return _ref3.apply(this, arguments);
        };
      }());
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
    key: "checkFileTypes",
    value: function checkFileTypes(_ref4, allowedTypes) {
      var type = _ref4.type;
      if (allowedTypes === '*') return {
        valid: true
      };
      var validObj = this.parseTypes(allowedTypes);

      if (!validObj.types.includes(type)) {
        // call optional client defined function
        if (this.onInvalidType instanceof Function) this.onInvalidType.call(validObj, validObj.message);else console.error(validObj.message);
        validObj.valid = false;
      } else {
        validObj.valid = true;
      }

      return validObj;
    }
  }, {
    key: "parseTypes",
    value: function parseTypes(allowedTypes) {
      var types = allowedTypes.map(function (type) {
        return type;
      });
      var typeArray = [],
          messageArray = [];
      var allImageTypes = types.indexOf('image/*');

      if (allImageTypes > -1) {
        typeArray.push.apply(typeArray, _toConsumableArray(this.imageTypes));
        types.splice(allImageTypes, 1);
        messageArray.push('an image');
      }

      var allVideoTypes = types.indexOf('video/*');

      if (allVideoTypes > -1) {
        typeArray.push.apply(typeArray, _toConsumableArray(this.videoTypes));
        types.splice(allVideoTypes, 1);
        messageArray.push('a video');
      } // push remaining types


      if (types.length > 0) {
        var _iterator2 = _createForOfIteratorHelper(types),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var type = _step2.value;
            typeArray.push(type);
            var mimeType = type.split('/');
            messageArray.push(".".concat(mimeType[1]));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      var message = messageArray.reduce(function (acc, cur, index) {
        if (index == 0) {
          return acc += cur;
        } else if (index == messageArray.length - 1) {
          return acc += " or ".concat(cur);
        }

        return acc += ", ".concat(cur);
      }, 'File type must be ');
      return {
        message: message,
        types: typeArray
      };
    }
  }, {
    key: "readFile",
    value: function readFile(file, resolve, reject) {
      var _this3 = this;

      var fileArray;
      var reader = new FileReader();

      reader.onprogress = function (e) {
        _this3.progress(e, file);
      };

      reader.onload = function (file) {
        return function (e) {
          var data = e.target.result;
          fileArray = {
            name: file.name,
            type: file.type,
            size: file.size,
            uuid: file.uuid,
            // id : file.id,
            data: data
          };

          _this3.readFileComplete(fileArray); // call optional onReadFileComplete


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

        console.error("Read File Error:", errMsg);
        reject(errMsg);
      };

      reader.readAsDataURL(file);
    }
  }, {
    key: "progress",
    value: function progress(e, file) {
      if (this.onReaderProgress instanceof Function) this.onReaderProgress.call(file, e);
    }
  }, {
    key: "readFileComplete",
    value: function readFileComplete(fileArray) {
      if (this.onFileReadComplete instanceof Function) this.onFileReadComplete.call(this, fileArray);
    }
    /**
     * 
     * @param {object} icons an object of icon images to be served by getPreview
     * @property {string} icons.pdf 
     * @property {string} icons.text 
     */

  }]);

  return FileSelect;
}();

var _default = FileSelect;
exports["default"] = _default;
module.exports = FileSelect;