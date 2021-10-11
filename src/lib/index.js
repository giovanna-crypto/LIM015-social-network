/* aqui vamos a crear el objeto que reuna a todos los
 archivos de view para no exportarlas de Una en uno */

import Home from './login.js';
import Register from './register.js';
import Profile from './profile.js';
import Different from './error404.js';

const components = {
  login: Home,
  register: Register,
  profile: Profile,
  different: Different,
};
export { components };
