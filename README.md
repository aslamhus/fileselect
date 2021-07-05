# @aslamhus/fileselect

A simple library for selecting, reading, and creating previews of files. FileSelect can generate previews for pdfs and images (including HEIC).

## Dependencies

This package depends on the [Alex Corvi's Heic2any](https://alexcorvi.github.io/heic2any/) and [PDF.js](https://github.com/mozilla/pdf.js) to generate  blobs for Heic files and Pdfs.

## Installation

`npm install @aslamhus/fileselect`

## Basic Usage

***
The basic usage will:

1. automatically append a (hidden) file input element  `<input type='file'>`  to the DOM. The input element is required to trigger the file select. If there is already a file element in the DOM, **FileSelect** will use the first one it finds
2. Assume all files types are allowed ("*")

### Basic Example

_Trigger a file select window._
_When the files have been read, returns a fileList as a promise_

    import FileSelect from 'fileselect'
    const fileSelect = new FileSelect()
    fileSelect.select().then(files => { 
        // do something
    })

#### Get previews of the files

     fileSelect.select().then(fileList => {
        // ready to generate previews
        for(let file of fileList){
            fileSelect.getPreview(file).then(previewElement => {
                document.body.append(previewElement)
            });
        }
    });

#### Read the files as data:URLs

    fileSelect.select().then(fileList => {
        fileSelect.readFiles(fileList).then(files => {
            // ready to upload
            console.log('files',files)
        })
    });

## Options

### Use a specific file input element

***
    const myInput = document.querySelector('#myInput')
    const fileSelect = new FileSelect("*", { fileInput : myInput}

### Don't add a file input tag

***
This might be useful if you are receiving a filelist or fileobject from a datatransfer

    const fileSelect = new FileSelect("*", { fileInput : false })

### `onFileReadComplete`

***
Each time a file is read, `onFileReadComplete` is called. You can access the file by passing your own callback into the `FileSelect` constructor:

    const fileSelect = new FileSelect("*", { onFileReadComplete : function(file){
        console.log('file object', file)
    }})

#### alternatively

    const fileSelect = new FileSelect()
    fileSelect.onFileReadComplete = (file) => { console.log(file)}

### Read Files without file selection

***
If you do not want to trigger the file select window, but simply want to read the files and/or generate previews you can use the **handleFile** method.

        let file = myFile;
        const fileSelect = new FileSelect();
        let readFiles = fileSelect.handleFile(file)

_Note: The files must be instances of the [File Object](https://developer.mozilla.org/en-US/docs/Web/API/File) from a file input element or a DataTransfer._

### Specify which file types are allowed

***
_[List of allowable types](#allowed-file-types "Go to list")_

    let allowedTypes = "['image/jpeg','application/pdf']"
    const fs = new FileSelect(allowedTypes)

_alternatively:_

    const fs = new FileSelect()
    fs.allowedTypes = ['image/jpeg','application/pdf']

### Allow all file types

    allowedTypes = "*"

### Allow all image types

    allowedTypes = "image/*"

### Allow all video types

    allowedTypes = "video/*" 

### Allow multiple types

    allowedTypes = ['image/jpeg','image/png','video/mp4']

## Tests

    `npm test`

## Allowed file types

_You can specify an allowed mime type of your choosing. Using "image/*" or "video/*" will allow any mimetype that contains 'image' or 'video'._

### **Image Types**

***

* image/*  all image types
* image/jpeg || image/jpg
* image/png
* image/tif,
* image/tiff
* image/gif
* image/bmp
* image/heif
* image/heic

#### **Video Types**

***

* video/* all video types
* video/mp4
* video/quicktime
* video/x-msvideo
* video/x-flv
* video/3gpp
* video/MP2T
* video/ogg
* video/x-m4v

#### **Application**

***

* application/pdf

#### **Text**

***

* text/rtf
