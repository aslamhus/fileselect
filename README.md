# @aslamhus/fileselect

A library for selecting, reading, and creating previews of files. FileSelect can generate previews for pdfs, audio files, video and images (including HEIC).

Github repo: [https://github.com/aslamhus/fileselect](https://github.com/aslamhus/fileselect)

## Dependencies

This package depends on [Alex Corvi's Heic2any](https://alexcorvi.github.io/heic2any/) and [PDF.js](https://github.com/mozilla/pdf.js) to generate previews for Heic files and Pdfs.

## Installation

```bash
npm install @aslamhus/fileselect
```

## Import

For node users:

```js
import FileSelect from '@aslamhus/fileselect';
```

In the browser, with no module bundler:

```js
import FileSelect from '../lib/FileSelect.js';
```

## Basic Usage

### Trigger a file select window

```js
const fileSelect = new FileSelect();
fileSelect.select().then((files) => {
  // do something with the files
});
```

The basic usage automatically appends a (hidden) file input element `<input type='file'>` to the DOM. The input element is required to trigger the file select. If there is already a file element in the DOM, FileSelect will use the first one it finds. It also assumes all files types are allowed `("\*")`

### Get previews of the files

```js
fileSelect.select().then((fileList) => {
  for (let file of fileList) {
    fileSelect.getPreview(file).then((preview) => {
      // appends a preview image to the document
      document.body.append(preview);
    });
  }
});
```

### Generate a file icon image for the selected file

This could be useful if you want to display a list of the selected files.
**FileSelect** uses a set of default icons.

```js
fileSelect.getIcon(file).then((icon) => {
  // appends a file icon image to the document
  document.body.append(icon);
});
```

### Read the files

To prepare to upload the files, you can use the `readFiles` to read each file object as a `Data:URL` representing the files contents. After the files are read you can upload the file or do whatever you need to with it. The readFiles method returns an array of `Promises` which resolve to the `Data:URL`. You can read files individually like so:

```js
fileSelect.readFiles(fileList).then((readingFiles) => {
  readingFiles.forEach((read) => {
    read.then((file) => {
      // ready to be sent to the server
    });
  });
});
```

or wait for all of the files to be read:

```js
fileSelect.readFiles(fileList).then((readingFiles) => {
  Promise.all(readingFiles).then((files) => {
    // handle array of files
  });
});
```

## Callbacks

### `onFileReadComplete`

---

Each time a file is read, `onFileReadComplete` is called. You can access the file by passing your own callback into the `FileSelect` constructor:

```js
const fileSelect = new FileSelect('*', {
  onFileReadComplete: function (file) {
    console.log('file object', file);
  },
});
```

alternatively

```js
const fileSelect = new FileSelect();
fileSelect.onFileReadComplete = (file) => {
  console.log(file);
};
```

### `onInvalidType`

By default if an unallowed file type is selected, **FileSelect** will throw an error. You can can add your own handler by passing a function to the `constructor`.

```js
const onInvalidType = (err) => {
  alert('invalid type, ' + err.message);
};
```

## Options

### Use a specific file input element

---

```js
const myInput = document.querySelector('#myInput')
const fileSelect = new FileSelect("*", { fileInput : myInput}
```

### Single file select only

---

By default, file select allows multiple files to be selected. To turn this off, pass this option into the constructor:

```js
const fileSelect = new FileSelect('*', { multiple: false });
```

### Prevent FileSelect from adding a file input element to the DOM

---

This might be useful if you are receiving a filelist or fileobject from a datatransfer

```js
const fileSelect = new FileSelect('*', { fileInput: false });
```

### Change color theme of file icons

---

Use a preformatted theme:

```js
const fileSelect = new FileSelect('*', { theme: 'red' });
```

For a list of supported themes see @aslamhus/fileicon [documentation](https://github.com/aslamhus/fileicon#colors)

or use your own colors.

```js
const colors = {
  bg: 'transparent',
  iconBg: 'coral',
  textBg: 'rgba(250,250,250,0.2)',
  text: '#FFF',
  outline: 'white',
};
const fileSelect = new FileSelect('*', { colors: colors });
```

### Read Files without file selection

---

If you do not want to trigger the file select window, but simply want to read the files and/or generate previews you can use the **handleFile** method.

```js
let file = myFile;
const fileSelect = new FileSelect();
let readFiles = fileSelect.handleFile(file);
```

_Note: The files must be instances of the [File Object](https://developer.mozilla.org/en-US/docs/Web/API/File) from a file input element or a `DataTransfer.`_

### Specify which file types are allowed

---

You can specify which file types `FileSelect` will accept by passing a string or array of strings as the first argument of the `constructor`:

```js
// allow jpegs and pdfs
let allowedTypes = "['image/jpeg','application/pdf']";
const fs = new FileSelect(allowedTypes);
// allow all images
const fs = new FileSelect('image/*');
```

#### Examples

| Value                        | Types allowed   |
| ---------------------------- | --------------- |
| \*                           | all files types |
| image/\*                     | all images      |
| video/\*                     | all videos      |
| [ 'image/png', 'video/mp4' ] | pngs and mp4s   |

### Get a `DIV` with a `backgroundImage` instead of an `IMG` element

Returns PDF and Image previews as divs instead of an img element.
The element stores the mimetype and blob url in its dataset:

```js
const fs = new FileSelect('*', { preview: { backgroundImage: true } });
```

**Note:**
If you use this option, please be sure to use URL.revokeObjectURL after you have loaded the image, since an onload event cannot be attached to a background image.

---

## Tests

```bash
`npm run test`
```
