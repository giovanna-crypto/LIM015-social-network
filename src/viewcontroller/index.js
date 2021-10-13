import { components } from '../view/componentes.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/': container.appendChild(components.home());
      break;
    case '#/catalogo': container.appendChild(components.catalogo());
      break;
    default:
  }
  return container;
};
export { changeView };
