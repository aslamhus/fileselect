"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

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
      fileInput: true,
      onReaderProgress: null,
      onReadFileComplete: null,
      onInvalidType: null,
      colors: null
    };

    _classCallCheck(this, FileSelect);

    // default colors for file icons
    this.colors = options.colors || this.themes.greyscale;
    this.themes = {
      greyscale: {
        bg: '#CCCCCC',
        iconBg: "#000000",
        textBg: "#333333",
        text: "#FFFFFF"
      },
      blue: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: "#2B73BA",
        textBg: "#00458F",
        text: "#FFFFFF"
      },
      lightBlue: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#3dccff',
        textBg: '#17bcff',
        text: "#FFFFFF"
      },
      red: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#be4646',
        textBg: '#901d1d',
        text: "#FFFFFF"
      },
      green: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#1b9362',
        textBg: '#01613a',
        text: "#FFFFFF"
      },
      purple: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#a040b8',
        textBg: '#73178a',
        text: "#FFFFFF"
      },
      black: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#000000',
        textBg: '#000000',
        text: "#FFFFFF"
      },
      white: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#ffffff',
        textBg: '#ffffff',
        text: "#000000"
      }
    };
    this.svg = {
      'default': '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file" class="svg-inline--fa fa-file fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"></path></svg>'
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
  }, {
    key: "select",
    value: function select() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!_this.fileInput) {
          console.error("Couldn't find file input element.");
          reject(false);
        } // prevents firing twice in case <input> tag is nested within target element 


        _this.fileInput.onclick = function (e) {
          return e.stopPropagation();
        }; // handles files, resolves selectImage's promise when the files are read.


        _this.fileInput.onchange = function (e) {
          var files = e.target.files;
          resolve(files);
        }; // trigger file selection.


        _this.fileInput.click();
      });
    }
  }, {
    key: "getFiles",
    value: function getFiles() {
      if (!this.fileInput) throw "There are no files to get";
      return this.fileInput.files;
    }
  }, {
    key: "readFiles",
    value: function () {
      var _readFiles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(files) {
        var filesRead, _iterator, _step, file, read;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                filesRead = [];
                _iterator = _createForOfIteratorHelper(files);
                _context2.prev = 2;

                _iterator.s();

              case 4:
                if ((_step = _iterator.n()).done) {
                  _context2.next = 12;
                  break;
                }

                file = _step.value;
                _context2.next = 8;
                return this.handleFile(file, this.allowedTypes);

              case 8:
                read = _context2.sent;
                if (read) filesRead.push(read);

              case 10:
                _context2.next = 4;
                break;

              case 12:
                _context2.next = 17;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](2);

                _iterator.e(_context2.t0);

              case 17:
                _context2.prev = 17;

                _iterator.f();

                return _context2.finish(17);

              case 20:
                ;
                return _context2.abrupt("return", filesRead);

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 14, 17, 20]]);
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
     * @param {File} file - the file object to be handled. Must be instance of file
     * @param {String | String[]} allowedTypes - file types allowed. Example: [ 'image/jpeg', 'application/pdf' ] 
     * @returns {Promise} - a promise that resolves when the file has been read.
     */

  }, {
    key: "handleFile",
    value: function handleFile(file, allowedTypes) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_typeof(file) !== 'object' || !(file instanceof File)) reject('Invalid Argument Exception. Expected instance of file.'); // give file a unique filename based on date

        file.uuid = file.name !== undefined ? file.name.replace(/(?=\.[^.]+$)/, '-' + Date.now()) : Date.now(); // check filetype is allowed

        var checkType = _this2.checkFileTypes(file, _this2.allowedTypes || allowedTypes);

        if (!checkType.valid) {
          resolve(checkType);
        } // read the file


        _this2.readFile(file, resolve, reject);
      });
    }
    /**
     * Gets a blob URL for the selected file.
     * If the file is a PDF or a TEXT file, it returns a predetermined svg icon (as a blob url)
     * @param {file object} file  - a selected file from the file input. 
     * @returns {Element} an element of the appropriate type (image, video, pdf)
     */

  }, {
    key: "getPreview",
    value: function () {
      var _getPreview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(file) {
        var previewObj, blob, mimetype, subtype, _file$type$split, _file$type$split2, url, previewEl, text, ext, iconBlob;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!file || _typeof(file) !== 'object' || !(file instanceof File))) {
                  _context3.next = 2;
                  break;
                }

                throw "Type Error. getPreview expected file object";

              case 2:
                previewObj = {
                  preview: null,
                  icon: null
                };
                _file$type$split = file.type.split('/');
                _file$type$split2 = _slicedToArray(_file$type$split, 2);
                mimetype = _file$type$split2[0];
                subtype = _file$type$split2[1];

                if (!(mimetype == 'image' || mimetype == 'video' || subtype == 'pdf' || file.type == 'text/plain')) {
                  _context3.next = 11;
                  break;
                }

                blob = file;
                _context3.next = 15;
                break;

              case 11:
                if (!(file.type == 'image/heic' || file.type == 'image/heif')) {
                  _context3.next = 15;
                  break;
                }

                _context3.next = 14;
                return this.getHEICBlob(file);

              case 14:
                blob = _context3.sent;

              case 15:
                if (blob) url = URL.createObjectURL(blob); // 3. create preview Element from URL object

                _context3.t0 = mimetype;
                _context3.next = _context3.t0 === 'application' ? 19 : _context3.t0 === 'text' ? 26 : _context3.t0 === 'video' ? 37 : _context3.t0 === 'image' ? 40 : 43;
                break;

              case 19:
                if (!(subtype == 'pdf')) {
                  _context3.next = 25;
                  break;
                }

                _context3.next = 22;
                return this.getPDF(url);

              case 22:
                previewEl = _context3.sent;
                _context3.next = 25;
                break;

              case 25:
                return _context3.abrupt("break", 43);

              case 26:
                if (!(subtype == 'plain')) {
                  _context3.next = 36;
                  break;
                }

                _context3.next = 29;
                return file.text();

              case 29:
                text = _context3.sent;
                console.log('text', text);
                previewEl = document.createElement('div');
                previewEl.style.padding = "15px";
                previewEl.textContent = text;
                _context3.next = 36;
                break;

              case 36:
                return _context3.abrupt("break", 43);

              case 37:
                previewEl = document.createElement('video');
                previewEl.src = url;
                return _context3.abrupt("break", 43);

              case 40:
                previewEl = document.createElement('img');
                previewEl.src = url;
                return _context3.abrupt("break", 43);

              case 43:
                // 4. Create icon
                // if the client has added an icon for the file type, use it
                // otherwise return the default icon
                ext = this.getExtensionFromFilename(file.name);

                if (!(this.svg[file.type] !== undefined)) {
                  _context3.next = 50;
                  break;
                }

                _context3.next = 47;
                return this.createSVGBlob(this.svg[file.type]);

              case 47:
                _context3.t1 = _context3.sent;
                _context3.next = 53;
                break;

              case 50:
                _context3.next = 52;
                return this.createDefaultIcon(ext, this.colors);

              case 52:
                _context3.t1 = _context3.sent;

              case 53:
                iconBlob = _context3.t1;
                // let iconSrc = URL.createObjectURL(iconBlob);
                // let iconEl = document.createElement('img');
                // iconEl.src = iconSrc;
                // 5. Return preview object with preview and icon properties
                previewObj.preview = previewEl; // previewObj.icon = iconEl;

                previewObj.icon = iconBlob;
                URL.revokeObjectURL(url);
                return _context3.abrupt("return", previewObj);

              case 58:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPreview(_x3) {
        return _getPreview.apply(this, arguments);
      }

      return getPreview;
    }()
  }, {
    key: "getExtensionFromFilename",
    value: function getExtensionFromFilename(filename) {
      console.log('filename', filename);
      return filename.match(/\.[0-9A-Z]+$/i);
    }
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

      function getHEICBlob(_x4) {
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
    /**
     * Draw an icon 
     * @param {String} ext - the file extension (to be drawn in the icon)
     * @param {Object} colors - color options for the icon
     * @param {String} colors.bg - bg behind icon color
     * @param {String} colors.iconBg - file icon bg color
     * @param {String} colors.textBg - text bg color
     * @param {String} colors.text - text color
     * @returns 
     */

  }, {
    key: "createDefaultIcon",
    value: function createDefaultIcon(ext, colors, themes) {
      var _this3 = this;

      return new Promise(function (resolve) {
        if (!colors) {
          colors = {
            bg: '#CCCCCC',
            iconBg: "#000000",
            textBg: "#333333",
            text: "#FFFFFF"
          };
        }

        var canvas = _this3.createCanvas();

        var ctx = canvas.getContext('2d');

        _this3.drawBg(canvas, ctx, colors.bg);

        _this3.drawIcon(canvas, ctx, colors.iconBg);

        _this3.drawTextBg(canvas, ctx, colors.textBg);

        _this3.drawText(canvas, ctx, ext, colors.text);

        resolve(canvas);
      });
    }
  }, {
    key: "createCanvas",
    value: function createCanvas() {
      var canvas = document.createElement('canvas');
      canvas.width = 384;
      canvas.height = 512;
      canvas.width = canvas.width;
      return canvas;
    }
  }, {
    key: "drawBg",
    value: function drawBg(canvas, ctx, color) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, {
    key: "drawTextBg",
    value: function drawTextBg(canvas, ctx, color) {
      ctx.fillStyle = color;
      ctx.fillRect(72, canvas.height - 190, 270, 120);
    }
  }, {
    key: "drawText",
    value: function drawText(canvas, ctx, ext, color) {
      ctx.fillStyle = color;
      ctx.font = "70px Arial";
      ctx.font = "normal normal normal normal 15px/28px 'Helvetica Neue', Helvetica, Arial, sans-serif";
      ctx.font = "small-caps bold 80px 'HelveticaNeue',Helvetica,Arial,sans-serif";
      ctx.textBaseline = 'middle';
      ctx.textAlign = "end";
      ctx.fillText(ext, 320, canvas.height - 190 + 60, 240);
    }
  }, {
    key: "drawIcon",
    value: function drawIcon(canvas, ctx, hexcolor) {
      ctx.save();
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.miterLimit = 4;
      ctx.scale(0.75, 0.75);
      var x = (canvas.width - canvas.width * 0.75) * 0.75;
      console.log('x', x);
      var y = (canvas.height - canvas.height * 0.75) * 0.75;
      ctx.translate(x, y);
      ctx.scale(1, 1);
      ctx.save();
      ctx.fillStyle = hexcolor || "#000000";
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
  }, {
    key: "draw1",
    value: function draw1(ctx, hexcolor) {
      ctx.save();
      ctx.strokeStyle = 'rgba(50,50,50,1)';
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';
      ctx.miterLimit = 2;
      ctx.save();
      ctx.fillStyle = hexcolor || "#000000";
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
  }, {
    key: "getPDF",
    value: function getPDF(url) {
      return new Promise( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve) {
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

        return function (_x5) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "checkFileTypes",
    value: function checkFileTypes(_ref3, allowedTypes) {
      var type = _ref3.type;
      if (allowedTypes === '*') return {
        valid: true
      };
      var validObj = this.getTypeList(allowedTypes || this.allowedTypes);
      var mediaType, subType;

      var _type$split = type.split('/');

      var _type$split2 = _slicedToArray(_type$split, 2);

      mediaType = _type$split2[0];
      subType = _type$split2[1];
      if (validObj.types.includes("".concat(mediaType, "/*"))) return {
        valid: true
      };

      if (validObj.types.includes(type)) {
        validObj.valid = true;
      } else {
        validObj.valid = false; // call optional client defined function

        if (this.onInvalidType instanceof Function) this.onInvalidType.call(validObj, validObj.message);else console.error(validObj.message);
      }

      return validObj;
    }
  }, {
    key: "getTypeList",
    value: function getTypeList(allowedTypes) {
      if (typeof allowedTypes == "string") {
        // convert string to array, i.e. allowedTypes = "image/jpeg" => ["image/jpeg"]
        allowedTypes = [allowedTypes];
      }

      var types = allowedTypes.map(function (type) {
        return type;
      });
      var typeArray = [],
          messageArray = []; // push remaining types

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
      var _this4 = this;

      var fileArray;
      var reader = new FileReader();

      reader.onprogress = function (e) {
        _this4.progress(e, file);
      };

      reader.onload = function (file) {
        return function (e) {
          var data = e.target.result;
          fileArray = {
            name: file.name,
            type: file.type,
            size: file.size,
            uuid: file.uuid,
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
  }]);

  return FileSelect;
}();

var _default = FileSelect;
exports["default"] = _default;
