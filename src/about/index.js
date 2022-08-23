import {
  selectAndGetFiles,
  getPreviews,
  getIcons,
  getIconsWithColors,
  readFiles,
  restrictFileType,
  restrictFileTypeMultiple,
} from './utils.js';
import './about.css';

if (module.hot) {
  module.hot.accept();
}

window.onload = () => {
  selectAndGetFiles();
  getPreviews();
  getIcons();
  getIconsWithColors();
  readFiles();
  restrictFileType();
  restrictFileTypeMultiple();
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
