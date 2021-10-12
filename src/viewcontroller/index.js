import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/':
      return container.appendChild(components.home());
    case '#/catalogo':
      return container.appendChild(components.catalogo());
    default: return console.log('hola');
  }
  // console.log(route);
};
export { changeView };
