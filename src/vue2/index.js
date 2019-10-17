compile(document.querySelector('#app'), data);

function compile(el, data) {
  let fragment = document.createDocumentFragment();
  let child;

  // 遍历将 el 的子节点全部放在 fragment 中
  while ((child = el.firstChild)) {
    // log
    fragment.appendChild(child);
  }

  // 对 el 里面的内容进行替换
  function replace(fragment) {
    Array.from(fragment.childNodes).forEach(node => {
      let textContent = node.textContent;
      let reg = /\{\{(.*?)\}\}/g;

      if (node.nodeType === 3 && reg.test(textContent)) {
        const nodeTextContent = node.textContent;
        const replaceText = () => {
          node.textContent = nodeTextContent.replace(
            reg,
            (matched, placeholder) => {
              return placeholder.split('.').reduce((prev, key) => {
                return prev[key];
              }, data);
            }
          );
        };

        replaceText();
      }

      // 如果还有子节点，继续递归 replace
      if (node.childNodes && node.childNodes.length) {
        replace(node);
      }
    });
  }

  replace(fragment);

  el.appendChild(fragment);
  return el;
}

function abc(str) {
  let res = str
    .split('')
    .reduce((result, item) => (result.endsWith(item) ? result : result + item));
  console.log('===>', res);
}

abc('aassddaass');
