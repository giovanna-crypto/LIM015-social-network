/* eslint-disable consistent-return */
import { components } from './lib/index.js';

const cambiarVista = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/login':
    { return container.appendChild(components.login()); }
    case '#/register':
    { return container.appendChild(components.register()); }
    case '#/posts':
    { return container.appendChild(components.profile()); }
    default:
      break;
  }

  console.log(route, 'Hola mundo!');
};
export { cambiarVista };
