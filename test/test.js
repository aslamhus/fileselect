const { expect } = require('chai');
const assert = require('assert');

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM(
  "<!DOCTYPE html><body><input type='file' id='myInput'></body>"
);
global.window = dom.window;
global.document = dom.window.document;
global.File = dom.window.File;
global.Blob = dom.window.Blob;
global.FileReader = dom.window.FileReader;
global.URL = dom.window.URL;
global.URL.createObjectURL = function (blob) {};
global.URL.revokeObjectURL = function (blob) {};

const { FileSelect } = require('../build/FileSelect.cjs');

describe('pass valid selector "#myInput" to constructor', async () => {
  it('should return valid file input element', () => {
    const FS = new FileSelect('*', { fileInput: '#myInput' });
    expect(FS.fileInput.type).to.equal('file');
  });
});

describe('pass string with invalid fileInput selector to constructor', async () => {
  it('should find a file input element in the dom with id myInput', () => {
    const FS = new FileSelect('*', { fileInput: '#mInput' });
    expect(FS.fileInput.id).to.equal('myInput');
  });
});
describe('pass file input element to constructor', async () => {
  it('should find input element with custom id', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'customFileInput';
    const FS = new FileSelect('*', { fileInput });
    expect(FS.fileInput.id).to.equal('customFileInput');
  });
});
describe('pass no fileInput to constructor', async () => {
  it('should find file input element in the dom', () => {
    const fileInput = document.createElement('input');
    const FS = new FileSelect();
    expect(FS.fileInput.type).to.equal('file');
  });
});
describe('no input element in dom, and pass no fileInput to constructor', async () => {
  it('should find file input element in the dom with an id equal to Date.now()', () => {
    const dom = new JSDOM('<!DOCTYPE html><body></body>');
    global.window = dom.window;
    global.document = dom.window.document;
    const fileInput = document.createElement('input');
    const FS = new FileSelect();
    const now = Date.now().toString().substring(0, 4);
    const id = FS.fileInput.id.substring(0, 4);
    expect(now).to.equal(id);
  });
});
describe('Specify rare file type allowable and then select that type of file', async () => {
  it('should return valid', () => {
    const fSelect = new FileSelect('image/x-jg');
    const file = { type: 'image/x-jg' };
    const types = fSelect.checkFileTypes(file);
    expect(types.valid).to.equal(true);
  });
});

describe('PNG, JPEG and all video allowed, input video', async () => {
  it('should return valid', () => {
    const fSelect = new FileSelect(['image/png', 'image/jpeg', 'video/*']);
    const file = { type: 'video/mp4' };
    const types = fSelect.checkFileTypes(file);
    expect(types.valid).to.equal(true);
  });
});

describe('All images allowed, input rare image type', async () => {
  it('should return valid', () => {
    const fSelect = new FileSelect('image/*');
    const file = { type: 'image/x-jg' };
    const types = fSelect.checkFileTypes(file);
    expect(types.valid).to.equal(true);
  });
});

describe("allowedTypes ['*'], input jpeg", async () => {
  it('should return valid', () => {
    const fSelect = new FileSelect(['*']);
    const file = { type: 'image/jpeg' };
    const types = fSelect.checkFileTypes(file);
    expect(types.valid).to.equal(false);
  });
});

describe('All video allowed, input misspelled mime-type', async () => {
  it('should return invalid', () => {
    const fSelect = new FileSelect('image/*');
    const file = { type: 'imge/x-jg' };
    const types = fSelect.checkFileTypes(file);
    expect(types.valid).to.equal(false);
  });
});

describe('PNG allowed, input jpeg', async () => {
  it('should return invalid', () => {
    const fSelect = new FileSelect();
    const file = { type: 'image/jpeg' };
    const types = fSelect.checkFileTypes(file, ['image/png']);
    expect(types.valid).to.equal(false);
  });
});
describe('all video allowed, input jpg', async () => {
  it('should return invalid', () => {
    const fSelect = new FileSelect();
    const file = { type: 'image/jpeg' };
    const types = fSelect.checkFileTypes(file, ['video/*']);
    expect(types.valid).to.equal(false);
  });
});

describe('everything allowed (*), input pdf', async () => {
  it('should return valid', () => {
    const fSelect = new FileSelect();
    const file = { type: 'application/pdf' };
    const types = fSelect.checkFileTypes(file, '*');
    expect(types.valid).to.equal(true);
  });
});

describe('pdf allowed, input pdf', async () => {
  it('should return valid', () => {
    const fSelect = new FileSelect();
    const file = { type: 'application/pdf' };
    const types = fSelect.checkFileTypes(file, ['application/pdf']);
    expect(types.valid).to.equal(true);
  });
});

describe('Read a file with an allowed type', async () => {
  it('should return valid', async () => {
    const f = new File([''], 'filename.jpeg', {
      type: 'image/jpeg',
      lastModified: '',
    });
    const FS = new FileSelect();
    const file = await FS.handleFile(f);
    expect(typeof file.data).to.equal('string');
  });
});

describe('Select an invalid file type', async () => {
  it('should throw an Error', async () => {
    const f = new File([''], 'filename.jpeg', {
      type: 'image/jpeg',
      lastModified: '',
    });
    assert.throws(() => {
      const FS = new FileSelect('image/png', { onInvalidType: invalid });
      const file = FS.handleFile(f);
    }, Error);
  });
});

describe('Get a preview of an image', async () => {
  it('should return IMG tagName', async () => {
    const f = new File([''], 'filename.jpeg', {
      type: 'image/jpeg',
      lastModified: '',
    });
    const FS = new FileSelect();
    const file = await FS.handleFile(f);
    const preview = await FS.getPreview(f);
    expect(preview.tagName).to.equal('IMG');
  });
});

describe('Get a preview of a video', async () => {
  it('should return VIDEO tagName', async () => {
    const f = new File([''], 'filename.mp4', {
      type: 'video/mp4',
      lastModified: '',
    });
    const FS = new FileSelect();
    const file = await FS.handleFile(f);
    const icon = await FS.getPreview(f);
    expect(icon.tagName).to.equal('VIDEO');
  });
});
