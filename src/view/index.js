/* aqui vamos a crear el objeto que reuna a todos los
 archivos de view para no exportarlas de Una en uno */

import Home from './home.js';
import Catalogo from './catalogo.js';

const components = {
  home: Home,
  catalogo: Catalogo,
};
export { components };
