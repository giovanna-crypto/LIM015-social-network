export default () => {
  const viewDifferent = `
      <h2>404</h2>
      <h1>Página no encontrada <h1>Pagina
      <p> El archivo essppecificado no se encontro en el sitio web.
      Por favor compruebe la URL para errores y vuelva a intentarlo >`;

  const secElement = document.createElement('section');
  secElement.className = 'error404';
  secElement.innerHTML = viewDifferent;
  return secElement;
};
