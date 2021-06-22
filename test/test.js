

const expect = require('chai').expect;
const FileSelect = require('../lib/FileSelect.js').default;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = (new JSDOM(`<!DOCTYPE html><body><input type='file' id='myInput'></body>`));
global.window = dom.window;
global.document = dom.window.document;
global.File = dom.window.File;
global.FileReader = dom.window.FileReader;
describe('pass string with valid fileInput selector to constructor', async ()=> {
    it('should return file input element',() => {
        let FS = new FileSelect("*", { fileInput : "#myInput"});
        expect(FS.fileInput.type).to.equal('file');
    });
});
describe('pass string with invalid fileInput selector to constructor', async ()=> {
    it('should find a file input element in the dom with id myInput',() => {
        let FS = new FileSelect("*", { fileInput : "#mInput"});
        expect(FS.fileInput.id).to.equal('myInput');
    });
});
describe('pass file input element to constructor', async ()=> {
    it('should find input element with custom id',() => {
        let fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = "customFileInput"
        let FS = new FileSelect("*", { fileInput : fileInput});
        expect(FS.fileInput.id).to.equal('customFileInput');
    });
});
describe('pass no fileInput to constructor', async ()=> {
    it('should find file input element in the dom',() => {
        let fileInput = document.createElement('input');
        let FS = new FileSelect();
        expect(FS.fileInput.type).to.equal('file');
    });
});
describe('no input element in dom, and pass no fileInput to constructor', async ()=> {
    it('should find file input element in the dom with an id equal to Date.now()',() => {
        const dom = (new JSDOM(`<!DOCTYPE html><body></body>`));
        global.window = dom.window;
        global.document = dom.window.document;
        let fileInput = document.createElement('input');
        let FS = new FileSelect();
        let now = Date.now().toString().substring(0,4);
        let id = FS.fileInput.id.substring(0,4);
        expect(now).to.equal(id);
    });
});
describe('Specify rare file type allowable and then select that type of file', async ()=> {
    it('should return valid',() => {
        let fSelect = new FileSelect('image/x-jg');
        let file = { type: 'image/x-jg'};
        let types = fSelect.checkFileTypes(file);
        expect(types.valid).to.equal(true);
    });
});

describe('PNG, JPEG and all video allowed, input video', async ()=> {
        it('should return valid',() => {
            let fSelect = new FileSelect(['image/png','image/jpeg','video/*']);
            let file = { type: 'video/mp4'};
            let types = fSelect.checkFileTypes(file);
            expect(types.valid).to.equal(true);
        });
    });

describe('All images allowed, input rare image type', async ()=> {
    it('should return valid',() => {
        let fSelect = new FileSelect('image/*');
        let file = { type: 'image/x-jg'};
        let types = fSelect.checkFileTypes(file);
        console.log('types',types)
        expect(types.valid).to.equal(true);
    });
});

describe("allowedTypes ['*'], input jpeg", async ()=> {
    it('should return valid',() => {
        let fSelect = new FileSelect(['*']);
        let file = { type: 'image/jpeg'};
        let types = fSelect.checkFileTypes(file);
        expect(types.valid).to.equal(false);
    });
});

describe('All video allowed, input misspelled mime-type', async ()=> {
    it('should return invalid',() => {
        let fSelect = new FileSelect('image/*');
        let file = { type: 'imge/x-jg'};
        let types = fSelect.checkFileTypes(file);
        expect(types.valid).to.equal(false);
    });
});

describe('PNG allowed, input jpeg', async ()=> {
    it('should return invalid',() => {
        let fSelect = new FileSelect();
        let file = { type: 'image/jpeg'};
        let types = fSelect.checkFileTypes(file, ['image/png']);
        expect(types.valid).to.equal(false);
    });
});
describe('all video allowed, input jpg', async ()=> {
    it('should return invalid',() => {
        let fSelect = new FileSelect();
        let file = { type: 'image/jpeg'};
        let types = fSelect.checkFileTypes(file, ['video/*']);
        expect(types.valid).to.equal(false);
    });
});

describe('everything allowed (*), input pdf', async ()=> {
    it('should return valid',() => {
        let fSelect = new FileSelect();
        let file = { type: 'application/pdf'};
        let types = fSelect.checkFileTypes(file, '*');
        expect(types.valid).to.equal(true);
    });
});

describe('pdf allowed, input pdf', async ()=> {
    it('should return valid',() => {
        let fSelect = new FileSelect();
        // console.log('allowedTypes', fSelect.allowedTypes);
        let file = { type: 'application/pdf'};
        let types = fSelect.checkFileTypes(file, ['application/pdf']);
        expect(types.valid).to.equal(true);
    });
});


describe('Read a file with an allowed type', async ()=> {
    it('should return valid',async () => {
        var f = new File([""], "filename.jpeg", {type: "image/jpeg", lastModified: ''});
        const FS = new FileSelect();
        let file = await FS.handleFile(f)
        // let fSelect = new FileSelect();
        // // console.log('allowedTypes', fSelect.allowedTypes);
        // let file = { type: 'application/pdf'};
        // let types = fSelect.checkFileTypes(file, ['application/pdf']);
        expect(typeof file.data).to.equal("string");
    });
});

describe('Read a file with an invalid type', async ()=> {
    it('should return invalid',async () => {
        var f = new File([""], "filename.jpeg", {type: "image/jpeg", lastModified: ''});
        const FS = new FileSelect("image/png");
        let file = await FS.handleFile(f)
        // handleFile returns errorObj 
        expect(file.valid).to.equal(false);
    });
});

describe('Get a preview of an image', async ()=> {
    it('should return tag name IMG',async () => {
        global.URL.createObjectURL = function(blob){}
        var f = new File([""], "filename.jpeg", {type: "image/jpeg", lastModified: ''});
        const FS = new FileSelect();
        let file = await FS.handleFile(f)
        let preview = await FS.getPreview(f);
        console.log('preview',preview.tagName)
        expect(preview.tagName).to.equal("IMG");
    });
});

describe('Get a preview of a video', async ()=> {
    it('should return tag name video',async () => {
        global.URL.createObjectURL = function(blob){}
        var f = new File([""], "filename.mp4", {type: "video/mp4", lastModified: ''});
        const FS = new FileSelect();
        let file = await FS.handleFile(f)
        let preview = await FS.getPreview(f);
        console.log('preview',preview.tagName)
        expect(preview.tagName).to.equal("VIDEO");
    });
});

