

const expect = require('chai').expect;
const FileSelect = require('../build/FileSelect').default;

describe('PNG allowed, input jpeg', async ()=> {
    it('should return invalid',() => {
        let fSelect = new FileSelect();
        // console.log('allowedTypes', fSelect.allowedTypes);
        let file = { type: 'image/jpeg'};
        let types = fSelect.checkFileTypes(file, ['image/png']);
        expect(types.valid).to.equal(false);
    });
});
describe('all video allowed, input jpg', async ()=> {
    it('should return invalid',() => {
        let fSelect = new FileSelect();
        // console.log('allowedTypes', fSelect.allowedTypes);
        let file = { type: 'image/jpeg'};
        let types = fSelect.checkFileTypes(file, ['video/*']);
        expect(types.valid).to.equal(false);
    });
});

describe('everything allowed (*), input pdf', async ()=> {
    it('should return valid',() => {
        let fSelect = new FileSelect();
        // console.log('allowedTypes', fSelect.allowedTypes);
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

// it("works", async ()=> {
//     let testFile = fs.readFileSync(`${__dirname}/img1.png`, { encoding : 'base64'});
//    let fileObj = {
//        name : 'img1.png',
//        data : testFile,
//        type : 'image/png',
//        size : 0
//    }
 
   

// });
// const fetch = require("node-fetch");
// describe('File Select Test - 1', async ()=> {
//     it("works", async ()=> {
//         let blob = await fetch('./img1.png')
//         .then(blob => {
//             console.log('blob',blob)
//             var f = new File([blob], "filename.png", {type: "image/png"})
//             console.log('file',f);
//             done();
//         });
//         console.log('hmmm')
//     });

// })



// describe('File Select Test - Allowed Types', () => {
//     it("should equal all video types", ()=> {
//         const file = import('img1.png');
//         expect(type).to.equal('video');

//     });

// });
// describe('Simple Math Test', () => {
//  it('should return 2', () => {
//         expect(1 + 1).to.equal(2);
//     });
//  it('should return 9', () => {
//         expect(3 * 3).to.equal(9);
//     });
// });