import { cambiarVista } from './index.js';

const init = () => {
  window.addEventListener('hashchange', () => {
    cambiarVista(window.location.hash);
  });
};
window.addEventListener('load', init);
