export default () => {
  const viewHome = `
  <h1 class="text-center">Bienvenidos a Ofertas 3B</h1><br><h3>Logueate</h3><figure><img src="../logo.png.png"</figure>`;
  const divElem = document.createElement('div');
  divElem.innerHtml = viewHome;
  return divElem;
};
