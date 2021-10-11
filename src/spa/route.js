/* eslint-disable indent */
// import desde VIEW/INDEX.JS porque

/* traerme el window.location.hash cada vez que cambie la vista de
la url para asociarlo con las vistas
// exporto a MAIN porque en main se esta escuchando el cambio de la url
import { components } from '../lib/componentes.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/':
      { return container.appendChild(components.home()); }
    case '#/registrate':
      { return container.appendChild(components.registro()); }
    default:
      { return container.appendChild(components.different()); }
  }
  // console.log(route)
};

export { changeView }; */
