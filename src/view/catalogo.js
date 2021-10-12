export default () => {
  const divElem = document.createElement('div');
  const viewCatalogo = ` 
  <h1>Bienvenidos al catalogo de Ofertas 3B</h1><br><h3>Registrate</h3>`;
  divElem.innerHtml = viewCatalogo;
  console.log(viewCatalogo, 'probando catalogo');
  return divElem;
};
