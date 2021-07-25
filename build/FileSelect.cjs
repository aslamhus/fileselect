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

var FileSelect = function () {
  function FileSelect() {
    var allowedTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      fileInput: true,
      onReaderProgress: null,
      onReadFileComplete: null,
      onInvalidType: null,
      colors: null,
      theme: null
    };

    _classCallCheck(this, FileSelect);

    this.fileIcon = new _fileicon.FileIcon({
      colors: options.colors,
      theme: options.theme
    });
    this.svg = {};
    this.onInvalidType = options.onInvalidType;
    this.validateArguments(allowedTypes, options);
  }

  _createClass(FileSelect, [{
    key: "validateArguments",
    value: function validateArguments(allowedTypes, _ref) {
      var fileInput = _ref.fileInput;

      if (fileInput) {
        var _this$fileInput;

        this.fileInput = fileInput;

        if (!((_this$fileInput = this.fileInput) !== null && _this$fileInput !== void 0 && _this$fileInput.tagName)) {
          this.fileInput = document.querySelector(fileInput) || document.querySelector('input[type=file]') || this.createFileInput();
        }
      }

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
      var _fileSelected = _asyncToGenerator(regeneratorRuntime.mark(function _callee(e) {
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
                  console.log('FileSelect - file', file);
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
        }

        _this.fileInput.onclick = function (e) {
          return e.stopPropagation();
        };

        _this.fileInput.onchange = function (e) {
          var files = e.target.files;
          files.forEach(function (file) {
            var types = _this.checkFileTypes(file, _this.allowedTypes);

            if (!types.valid) {
              reject(new Error(types.message));
            }
          });
          resolve(files);
        };

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
      var _readFiles = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(files) {
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
  }, {
    key: "handleFile",
    value: function handleFile(file, allowedTypes) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (_typeof(file) !== 'object' || !(file instanceof File)) {
          reject(new Error('Invalid Argument Exception. Expected instance of file.'));
        }

        var f = file;
        f.uuid = file.name !== undefined ? file.name.replace(/(?=\.[^.]+$)/, "-".concat(Date.now())) : Date.now();

        var types = _this3.checkFileTypes(file, _this3.allowedTypes || allowedTypes);

        if (!types.valid) {
          reject(new Error(types.message));
        }

        _this3.readFile(file, resolve, reject);
      });
    }
  }, {
    key: "getIcon",
    value: function () {
      var _getIcon = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(file) {
        var icon, _file$type$split, _file$type$split2, mimetype, ext, svgIcon, svgBlob;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _file$type$split = file.type.split('/'), _file$type$split2 = _slicedToArray(_file$type$split, 1), mimetype = _file$type$split2[0];
                ext = FileSelect.getExtensionFromFilename(file.name);

                if (!(this.svg.hasOwnProperty('default') || this.svg.hasOwnProperty(mimetype))) {
                  _context3.next = 12;
                  break;
                }

                svgIcon = this.svg["default"] || this.svg[mimetype];
                _context3.next = 6;
                return FileSelect.createSVGBlob(svgIcon);

              case 6:
                svgBlob = _context3.sent;
                icon = document.createElement('img');
                icon.src = URL.createObjectURL(svgBlob);
                icon.onload = URL.revokeObjectURL(svgBlob);
                _context3.next = 15;
                break;

              case 12:
                _context3.next = 14;
                return this.fileIcon.create(ext);

              case 14:
                icon = _context3.sent;

              case 15:
                return _context3.abrupt("return", icon);

              case 16:
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
  }, {
    key: "getPreview",
    value: function () {
      var _getPreview = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(file) {
        var blob, _file$type$split3, _file$type$split4, mimetype, subtype, url, previewEl, text;

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
                _file$type$split3 = file.type.split('/'), _file$type$split4 = _slicedToArray(_file$type$split3, 2), mimetype = _file$type$split4[0], subtype = _file$type$split4[1];

                if (!(file.type === 'image/heic' || file.type === 'image/heif')) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 6;
                return FileSelect.getHEICBlob(file);

              case 6:
                blob = _context4.sent;
                _context4.next = 10;
                break;

              case 9:
                if (mimetype === 'image' || mimetype === 'video' || mimetype === 'audio' || subtype === 'pdf' || file.type === 'text/plain') {
                  blob = file;
                } else {
                  console.log("unrecognized file type: ".concat(file.type));
                  blob = file;
                }

              case 10:
                url = file;
                if (blob) url = URL.createObjectURL(blob);
                _context4.t0 = mimetype;
                _context4.next = _context4.t0 === 'application' ? 15 : _context4.t0 === 'text' ? 22 : _context4.t0 === 'video' ? 32 : _context4.t0 === 'audio' ? 35 : _context4.t0 === 'image' ? 37 : 40;
                break;

              case 15:
                if (!(subtype === 'pdf')) {
                  _context4.next = 21;
                  break;
                }

                _context4.next = 18;
                return FileSelect.getPDF(url);

              case 18:
                previewEl = _context4.sent;
                _context4.next = 21;
                break;

              case 21:
                return _context4.abrupt("break", 40);

              case 22:
                if (!(subtype === 'plain')) {
                  _context4.next = 31;
                  break;
                }

                _context4.next = 25;
                return file.text();

              case 25:
                text = _context4.sent;
                previewEl = document.createElement('div');
                previewEl.style.padding = '15px';
                previewEl.textContent = text;
                _context4.next = 31;
                break;

              case 31:
                return _context4.abrupt("break", 40);

              case 32:
                previewEl = document.createElement('video');
                previewEl.src = url;
                return _context4.abrupt("break", 40);

              case 35:
                previewEl = FileSelect.createAudioElement(url, file.type);
                return _context4.abrupt("break", 40);

              case 37:
                previewEl = document.createElement('img');
                previewEl.src = url;
                return _context4.abrupt("break", 40);

              case 40:
                if (previewEl && mimetype !== 'audio') {
                  previewEl.onload = function () {
                    URL.revokeObjectURL(url);
                  };
                }

                return _context4.abrupt("return", previewEl);

              case 42:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
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
        validObj.valid = false;

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
    key: "createAudioElement",
    value: function createAudioElement(url, type) {
      var aud = document.createElement('audio');
      aud.controls = 'controls';

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
      var _getHEICBlob = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(file) {
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
              page.render(renderContext);
              resolve(canvas);
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
        aTypes = [aTypes];
      }

      var types = aTypes.map(function (type) {
        return type;
      });
      var typeArray = [];
      var messageArray = [];

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
