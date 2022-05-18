const findElement = (selector) => {
  let iterationCount = 0;
  const waitForElement = () => {
    return new Promise((resolve, reject) => {
      const isFound = false;
      const el = document.querySelector(selector);
      if (el) {
        resolve(el);
      } else {
        iterationCount++;
        if (iterationCount <= 30) {
          setTimeout(() => {
            resolve(waitForElement(selector));
          }, 1000);
        } else {
          reject('Timeout');
        }
      }
    });
  };
  return waitForElement();
};

const init = () => {
  const findEditor = findElement('.ace_editor');
  findEditor.then((aceEditor) => {
    window.aceEditor = aceEditor.env.editor;
    aceEditor.env.editor.setOptions({
      maxLines: Infinity,
      tabSize: 2,
      useSoftTabs: true,
      highlightActiveLine: true,
      cursorStyle: 'smooth',
      autoScrollEditorIntoView: true,
      displayIndentGuides: true,
    });
  });
};

const allowedUrl = /^https:\/\/akdbuildv2.admitkard.com\/.*job\/.*\/configure/;

(function() {
  'use strict';

  if (allowedUrl.test(window.location.href)) {
    init();
  }
})();
