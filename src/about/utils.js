import { FileSelect } from '../../build/FileSelect.cjs';

export const selectAndGetFiles = () => {
  const example = document.querySelector('#file-select');
  example.querySelector('button').onclick = (e) => {
    const preview = example.querySelector('.preview');

    const fileSelect = new FileSelect();
    fileSelect
      .select()
      .then((fileList) => {
        const fileArray = fileList.toArray();
        writeArrayOfObjectstoContainer(fileArray, 'name', preview);
      })
      .catch((error) => handleError(error, preview));
  };
};

export const getPreviews = () => {
  const example = document.querySelector('#get-previews');
  example.querySelector('button').onclick = (e) => {
    const preview = example.querySelector('.preview');

    const fileSelect = new FileSelect();
    fileSelect
      .select()
      .then((files) => {
        startLoader(preview);
        files.getPreviews().then((previewNodes) => {
          appendNodesToPreviewContainer(previewNodes, preview);
          stopLoader(preview);
        });
      })
      .catch((error) => handleError(error, preview));
  };
};

export const getIcons = () => {
  const example = document.querySelector('#get-icons');
  example.querySelector('button').onclick = (e) => {
    const preview = example.querySelector('.preview');

    const fileSelect = new FileSelect();
    fileSelect
      .select()
      .then((files) => {
        startLoader(preview);
        files.getIcons().then((icons) => {
          appendNodesToPreviewContainer(icons, preview);
          stopLoader(preview);
        });
      })
      .catch((error) => handleError(error, preview));
  };
};

export const getIconsWithColors = () => {
  const example = document.querySelector('#get-icons-with-colors');
  example.querySelector('button').onclick = (e) => {
    const preview = example.querySelector('.preview');

    const fileSelect = new FileSelect('*', {
      colors: {
        bg: 'transparent',
        iconBg: 'darkblue',
        textBg: 'rgba(250,250,250,0.2)',
        text: '#FFF',
        outline: 'lightgray',
      },
    });
    fileSelect
      .select()
      .then((files) => {
        startLoader(preview);
        files.getIcons().then((icons) => {
          appendNodesToPreviewContainer(icons, preview);
          stopLoader(preview);
        });
      })
      .catch((error) => handleError(error, preview));
  };
};

export const readFiles = () => {
  const example = document.querySelector('#read-files');
  //   example.querySelector('button').onclick = (e) => {
  //     const preview = example.querySelector('.preview');

  //     const fileSelect = new FileSelect();
  //     fileSelect
  //       .select()
  //       .then((files) => {
  //         startLoader(preview);
  //         files.readFiles().then((dataURLs) => {
  //           writeArrayOfObjectstoContainer(dataURLs, 'data', preview);
  //           stopLoader(preview);
  //         });
  //       })
  //       .catch((error) => handleError(error, preview));
  //   };
};

export const restrictFileType = () => {
  const example = document.querySelector('#restrict-file-type');
  example.querySelector('button').onclick = (e) => {
    const preview = example.querySelector('.preview');

    const fileSelect = new FileSelect('application/pdf');
    fileSelect
      .select()
      .then((fileList) => {
        const fileArray = fileList.toArray();
        writeArrayOfObjectstoContainer(fileArray, 'name', preview);
      })
      .catch((error) => handleError(error, preview));
  };
};

export const restrictFileTypeMultiple = () => {
  const example = document.querySelector('#restrict-file-type-multiple');
  example.querySelector('button').onclick = (e) => {
    const preview = example.querySelector('.preview');
    const fileSelect = new FileSelect(['image/jpeg', 'images/png']);
    fileSelect
      .select()
      .then((fileList) => {
        const fileArray = fileList.toArray();
        writeArrayOfObjectstoContainer(fileArray, 'name', preview);
      })
      .catch((error) => handleError(error, preview));
  };
};

// const fs = new FileSelect('*', {
//   fileInput: true,
//   theme: 'blue',
//   react: 'true',
//   multiple: true,
//   onFileSizeLimitExceeded: (err, fileSize, fileSizeLimit) => {
//     alert(`The file size is ${fileSize} and the limit is ${fileSizeLimit}`);
//   },
//   // onInvalidType: onInvalidType,
// });

/** Helpers */

const writeArrayOfObjectstoContainer = (array, propName, container) => {
  array.forEach((file, index) => {
    container.innerHTML = `${container.innerHTML}<p>${index + 1}. ${file?.[propName] || ''}</p>`;
  });
};

const appendNodesToPreviewContainer = (nodes, container) => {
  container.append(...nodes);
};

const handleError = (error, container) => {
  console.error(error);
  container.innerHTML = `<span class='text-danger'>${error.message}</span>`;
};

const startLoader = (container) => {
  const spinner = container.querySelector('.spinner-border');
  if (spinner) {
    spinner.style.display = 'block';
  }
};

const stopLoader = (container) => {
  const spinner = container.querySelector('.spinner-border');
  if (spinner) {
    spinner.style.display = 'none';
  }
};
