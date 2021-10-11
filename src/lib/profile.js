export default () => {
  const viewPost = '<h1>Bienvenidos a Ofertas 3B</h1><br><h3>Postea</h3>';
  const newElem = document.createElement('div');
  newElem.innerHtml = viewPost;
  return newElem;
};
