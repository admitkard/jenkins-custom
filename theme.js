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

(function() {
  'use strict';

  const findEditor = findElement('.ace_editor');
  findEditor.then((aceEditor) => {
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
})();