"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileSelect = void 0;
var _fileicon = require("@aslamhus/fileicon");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FileSelect = exports.FileSelect = function () {
  function FileSelect() {
    var allowedTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      fileInput: true,
      onReaderProgress: null,
      onReadFileComplete: null,
      onInvalidType: null,
      onFileSizeLimitExceeded: null,
      multiple: null,
      colors: null,
      theme: null,
      fileSize: null,
      preview: {
        backgroundImage: false
      }
    };
    _classCallCheck(this, FileSelect);
    this.fileIcon = new _fileicon.FileIcon({
      colors: options.colors,
      theme: options.theme
    });
    this.svg = {};
    this.fileList = [];
    this.preview = options.preview;
    this.onInvalidType = options.onInvalidType;
    this.onFileSizeLimitExceeded = options.onFileSizeLimitExceeded;
    this.fileSize = options.fileSize || 100000000;
    this.multiple = options.multiple === false ? false : true;
    this.validateArguments(allowedTypes, options);
    this.getPreview = this.getPreview.bind(this);
  }
  return _createClass(FileSelect, [{
    key: "validateArguments",
    value: function validateArguments(allowedTypes, _ref) {
      var fileInput = _ref.fileInput;
      if (fileInput !== false) {
        var _this$fileInput;
        this.fileInput = fileInput;
        if (!((_this$fileInput = this.fileInput) !== null && _this$fileInput !== void 0 && _this$fileInput.tagName)) {
          this.fileInput = document.querySelector(fileInput) || document.querySelector('input[type=file]') || this.createFileInput();
        }
      }
      if (allowedTypes) this.allowedTypes = allowedTypes;else this.allowedTypes = '*';
    }
  }, {
    key: "setFileSizeLimit",
    value: function setFileSizeLimit(size) {
      if (isNaN(size)) {
        throw new Error('Invalid Argument. setFileSizeLimit expected number but found ' + _typeof(size));
      }
      this.fileSize = size;
    }
  }, {
    key: "createFileInput",
    value: function createFileInput() {
      this.fileInput = document.createElement('input');
      this.fileInput.type = 'file';
      this.fileInput.id = Date.now();
      this.fileInput.style.display = 'none';
      if (this.multiple) this.fileInput.multiple = 'true';
      document.body.append(this.fileInput);
      return this.fileInput;
    }
  }, {
    key: "fileSelected",
    value: function () {
      var _fileSelected = _asyncToGenerator(_regenerator().m(function _callee(e) {
        var file, _e$target$files, fileRead;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (e.target) {
                e.stopPropagation();
                e.preventDefault();
                _e$target$files = _slicedToArray(e.target.files, 1);
                file = _e$target$files[0];
              } else {
                file = e;
              }
              _context.n = 1;
              return this.handleFile(file, this.allowedTypes);
            case 1:
              fileRead = _context.v;
              if (!fileRead) {
                _context.n = 2;
                break;
              }
              return _context.a(2, true);
            case 2:
              return _context.a(2, true);
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
          var fileListArray = Array.from(files);
          _this.fileList = [].concat(_toConsumableArray(_this.fileList), _toConsumableArray(files));
          for (var _i = 0, _fileListArray = fileListArray; _i < _fileListArray.length; _i++) {
            var file = _fileListArray[_i];
            var types = _this.checkFileTypes(file, _this.allowedTypes);
            if (!types.valid) {
              reject(new Error(types.message));
            }
            if (file.size > _this.fileSize) {
              var fileSizeError = new Error('Failed to select file, File size exceeded limit');
              if (_this.onFileSizeLimitExceeded instanceof Function) {
                _this.onFileSizeLimitExceeded(fileSizeError, file.size, _this.fileSize);
              }
              reject(fileSizeError);
            }
          }
          files.toArray = function () {
            return Array.from(this);
          };
          files.readFiles = function () {
            return Promise.resolve(_this.readFiles(fileListArray));
          };
          files.getPreviews = function () {
            return Promise.all(fileListArray.map(function (file) {
              return _this.getPreview(file);
            }));
          };
          files.getIcons = function () {
            return Promise.all(fileListArray.map(function (file) {
              return _this.getIcon(file);
            }));
          };
          resolve(files);
        };
        _this.fileInput.click();
      });
    }
  }, {
    key: "getFiles",
    value: function getFiles() {
      return this.fileList;
    }
  }, {
    key: "removeFiles",
    value: function removeFiles() {
      this.fileList = [];
      this.fileInput.value = null;
      return this.fileList;
    }
  }, {
    key: "readFiles",
    value: (function () {
      var _readFiles = _asyncToGenerator(_regenerator().m(function _callee2(files) {
        var _this2 = this;
        var filesRead;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              filesRead = [];
              if (!(files !== null && files !== void 0 && files.length)) {
                _context2.n = 2;
                break;
              }
              Object.values(files).forEach(function (file) {
                if (file instanceof File) {
                  filesRead.push(_this2.handleFile(file, _this2.allowedTypes));
                }
              });
              _context2.n = 1;
              return Promise.all(filesRead);
            case 1:
              return _context2.a(2, _context2.v);
            case 2:
              _context2.n = 3;
              return this.handleFile(files, this.allowedTypes);
            case 3:
              return _context2.a(2, _context2.v);
          }
        }, _callee2, this);
      }));
      function readFiles(_x2) {
        return _readFiles.apply(this, arguments);
      }
      return readFiles;
    }())
  }, {
    key: "handleFile",
    value: function handleFile(file, allowedTypes) {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        if (_typeof(file) !== 'object' || !(file instanceof File)) {
          reject(new Error('Invalid Argument Exception. Expected instance of File but found ' + _typeof(file)));
        }
        var f = file;
        var uuidFileName = (file === null || file === void 0 ? void 0 : file.name) !== undefined ? file === null || file === void 0 ? void 0 : file.name.replace(/(?=\.[^.]+$)/, "-".concat(Date.now())) : Date.now();
        uuidFileName = uuidFileName.replace(/\s+/g, '-');
        f.uuid = uuidFileName;
        var types = _this3.checkFileTypes(file, _this3.allowedTypes || allowedTypes);
        if (!types.valid) {
          reject(new Error(types.message));
        }
        if (file.size > _this3.fileSize) {
          reject(new Error('Failed to handle file, File size exceeded limit'));
        }
        if (file.type.toLowerCase().includes('heic') || file.type.toLowerCase().includes('heif')) {
          if (file.heicConvert) {
            file.heicConvert.then(function (blob) {
              var newFile = FileSelect.blobToFile(blob, f);
              _this3.readFile(newFile, resolve, reject);
            });
          } else {
            file.heicConvert = FileSelect.getHEICBlob(f);
            file.heicConvert.then(function (blob) {
              var newFile = FileSelect.blobToFile(blob, f);
              _this3.readFile(newFile, resolve, reject);
            });
          }
        } else {
          _this3.readFile(file, resolve, reject);
        }
      });
    }
  }, {
    key: "getIcon",
    value: function () {
      var _getIcon = _asyncToGenerator(_regenerator().m(function _callee3(file) {
        var svg,
          icon,
          _file$type$split,
          _file$type$split2,
          mimetype,
          ext,
          svgIcon,
          svgBlob,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              svg = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
              _file$type$split = file.type.split('/'), _file$type$split2 = _slicedToArray(_file$type$split, 1), mimetype = _file$type$split2[0];
              ext = FileSelect.getExtensionFromFilename(file === null || file === void 0 ? void 0 : file.name);
              if (!(this.svg.hasOwnProperty('default') || this.svg.hasOwnProperty(mimetype))) {
                _context3.n = 2;
                break;
              }
              svgIcon = this.svg["default"] || this.svg[mimetype];
              _context3.n = 1;
              return FileSelect.createSVGBlob(svgIcon);
            case 1:
              svgBlob = _context3.v;
              icon = document.createElement('img');
              icon.src = URL.createObjectURL(svgBlob);
              icon.onload = URL.revokeObjectURL(svgBlob);
              _context3.n = 4;
              break;
            case 2:
              _context3.n = 3;
              return this.fileIcon.create(ext);
            case 3:
              icon = _context3.v;
            case 4:
              return _context3.a(2, icon);
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
    value: (function () {
      var _getPreview = _asyncToGenerator(_regenerator().m(function _callee4(file) {
        var _this$preview2;
        var blob, _file$type$split3, _file$type$split4, mimetype, subtype, newFile, previewEl, url, _this$preview, pdfBlob, isBgImage, text, _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (!(!file || _typeof(file) !== 'object' || !(file instanceof File))) {
                _context4.n = 1;
                break;
              }
              throw new Error('Type Error. getPreview expected file object');
            case 1:
              _file$type$split3 = file.type.split('/'), _file$type$split4 = _slicedToArray(_file$type$split3, 2), mimetype = _file$type$split4[0], subtype = _file$type$split4[1];
              if (!(file.type === 'image/heic' || file.type === 'image/heif')) {
                _context4.n = 3;
                break;
              }
              file.heicConvert = FileSelect.getHEICBlob(file);
              _context4.n = 2;
              return file.heicConvert;
            case 2:
              blob = _context4.v;
              newFile = FileSelect.blobToFile(blob, file);
              file.heicConvert = newFile;
              _context4.n = 4;
              break;
            case 3:
              if (mimetype === 'image' || mimetype === 'video' || mimetype === 'audio' || subtype === 'pdf' || file.type === 'text/plain') {
                blob = file;
              } else {
                console.warn("unrecognized file type: ".concat(file.type));
                blob = null;
              }
            case 4:
              url = file;
              if (blob) {
                url = URL.createObjectURL(blob);
              } else {
                previewEl = FileSelect.createNoPreview();
              }
              _t = mimetype;
              _context4.n = _t === 'application' ? 5 : _t === 'text' ? 9 : _t === 'video' ? 13 : _t === 'audio' ? 14 : _t === 'image' ? 15 : 16;
              break;
            case 5:
              if (!(subtype === 'pdf')) {
                _context4.n = 7;
                break;
              }
              _context4.n = 6;
              return FileSelect.getPDF(url);
            case 6:
              pdfBlob = _context4.v;
              isBgImage = (this === null || this === void 0 ? void 0 : (_this$preview = this.preview) === null || _this$preview === void 0 ? void 0 : _this$preview.backgroundImage) || null;
              if (isBgImage) {
                previewEl = FileSelect.createBackgroundImageDiv(pdfBlob, file.type);
              } else {
                previewEl = FileSelect.createImg(pdfBlob);
              }
              _context4.n = 8;
              break;
            case 7:
              previewEl = FileSelect.createNoPreview();
            case 8:
              return _context4.a(3, 17);
            case 9:
              if (!(subtype === 'plain')) {
                _context4.n = 11;
                break;
              }
              _context4.n = 10;
              return file.text();
            case 10:
              text = _context4.v;
              previewEl = document.createElement('div');
              previewEl.style.padding = '15px';
              previewEl.textContent = text;
              _context4.n = 12;
              break;
            case 11:
              previewEl = FileSelect.createNoPreview();
            case 12:
              return _context4.a(3, 17);
            case 13:
              previewEl = document.createElement('video');
              previewEl.preload = '';
              previewEl.src = url;
              previewEl.controls = true;
              return _context4.a(3, 17);
            case 14:
              previewEl = FileSelect.createAudioElement(url, file.type);
              return _context4.a(3, 17);
            case 15:
              if (this !== null && this !== void 0 && (_this$preview2 = this.preview) !== null && _this$preview2 !== void 0 && _this$preview2.backgroundImage) {
                previewEl = FileSelect.createBackgroundImageDiv(url, file.type);
              } else {
                previewEl = FileSelect.createImg(url);
              }
              return _context4.a(3, 17);
            case 16:
              previewEl = FileSelect.createNoPreview();
            case 17:
              if (previewEl && mimetype !== 'audio' && mimetype !== 'image' && mimetype !== 'application') {
                previewEl.onload = function () {
                  URL.revokeObjectURL(url);
                };
              }
              if (previewEl) {
                previewEl.dataset.mimetype = mimetype;
                previewEl.dataset.subtype = subtype;
              }
              return _context4.a(2, previewEl);
          }
        }, _callee4, this);
      }));
      function getPreview(_x4) {
        return _getPreview.apply(this, arguments);
      }
      return getPreview;
    }())
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
        if (e.lengthComputable) {
          var rprogress = parseInt(e.loaded / e.total * 100, 10);
        }
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
      aud.oncanplaythrough = function () {};
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
      var _getHEICBlob = _asyncToGenerator(_regenerator().m(function _callee5(file) {
        var _yield$import, heic2any, blob;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require('heic2any'));
              });
            case 1:
              _yield$import = _context5.v;
              heic2any = _yield$import["default"];
              _context5.n = 2;
              return heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: 0.5
              }).then(function (result) {
                return result;
              })["catch"](function (err) {
                console.error("Failed to get blob for heic file. Error: ".concat(err));
                return false;
              });
            case 2:
              blob = _context5.v;
              return _context5.a(2, blob);
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
      var newFilename = ((file === null || file === void 0 ? void 0 : file.uuid) || (file === null || file === void 0 ? void 0 : file.name)).replace(/(HEIC)/, ext);
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
          return _interopRequireWildcard(require('pdfjs-dist/webpack.mjs'));
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
              canvas.style.cssText = "\n                           position:relative;\n                           width:100%;\n                           height:auto;\n                           margin:0px auto;\n                           top:50%;\n                           transform: translateY(-50%);";
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
}();
