/* aqui vamos a crear el objeto que reuna a todos los
 archivos de view para no exportarlas de Una en uno */

import home from './home.js';
import catalogo from './catalogo.js';

const components = {
  home,
  catalogo,
};
export { components };
