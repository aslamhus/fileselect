import { FileSelect } from '../lib/FileSelect.js';
if (module.hot) {
  //   module.hot.accept(['../../node_modules/@aslamhus/fileselect/build/FileSelect.js'], function () {
  //     console.log('hot mod coming in......!');
  //   });
  module.hot.accept();
}

window.onload = async () => {
  const selectBtn = document.querySelector('button#select');
  const fileInput = document.querySelector('#file-input-test3');
  selectBtn.onclick = selectBtn_onclick;
};

const selectBtn_onclick = (e) => {
  const fs = new FileSelect();
  fs.select().then((files) => {
    console.log('test files', files);
  });

  return;
  const previewContainer = document.querySelector('#preview');
  const onInvalidType = (validObj) => {
    console.log('validObj', validObj);
    alert('invalid type, ' + validObj.message);
  };
  const fileSelect = new FileSelect('*', {
    fileInput: true,
    theme: 'blue',
    react: 'true',
    multiple: false,
    // onInvalidType: onInvalidType,
  });
  fileSelect.select().then((fileList) => {
    // a filelist object (blobs)
    // ready to generate previews

    for (let file of fileList) {
      // create container
      const filePreview = document.createElement('div');
      filePreview.style.display = 'block';
      filePreview.style.position = 'relative';
      // get icon
      fileSelect.getIcon(file).then((icon) => {
        console.log(icon);
        renderThumb(icon, filePreview);
      });
      // get preview
      fileSelect.getPreview(file).then((preview) => {
        renderThumb(preview, filePreview);
      });
      // add filename
      const p = document.createElement('p');
      p.textContent = file.name;
      p.style.cssText = `
              display:inline-block;
              position: absolute;
              top: 50%;
              left: 285px;
              transform:tranlsateY(-50%)`;
      filePreview.append(p);
      previewContainer.append(filePreview);
    }
    fileSelect.readFiles(fileList).then((filePromises) => {
      Promise.all(filePromises).then((files) => {
        console.log('files', files);
      });
    });
  });
};

function renderThumb(node, container) {
  const div = document.createElement('div');
  div.style.cssText = `
            position:relative;
            width:100px;
            height:100px;
            margin:10px;
            font-size:9px;
            overflow:hidden;
            display:inline-block;
        `;
  let nodeCss = `
      width:60%;
      padding:5%;
      -webkit-box-sizing:border-box;
      box-sizing:border-box;
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      `;

  if (!node) {
    node = document.createElement('div');
    node.id = 'test';
    node.style.cssText = nodeCss;
    node.style.height = '60%';
    node.style.border = '1px dotted gray';
  } else {
    node.style.cssText = nodeCss;
  }

  div.append(node);
  container.append(div);
}
