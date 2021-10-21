// import { deletePost } from '../firebase/firestore.js';

export const modaldeletePost = (section) => {
  const newSectionDelete = document.createElement('section');
  const modaldelete = document.createElement('section');
  modaldelete.innerHTML += `
        <p class="pDeleteMenu">¿Desea borrar el post?</p>
        <ul class="deleteMenu">
          <li id="idYes"><i class="fas fa-check"></i>Si</li>
          <li id="idNo"><i class="fas fa-times"></i>No</li>
        </ul>`;

  /*  const idYes = newSectionDelete.querySelector('#idYes');
  const idNo = newSectionDelete.querySelector('#idNo');
  // eslint-disable-next-line no-undef
  idYes.addEventListener('click', () => deletePost(doc.data().post)
    .then((resp) => resp)
    .catch((err) => console.error(err)));
  idNo.addEventListener('click', () => {
    section.classList.add('hide');
  }); */
  modaldelete.appendChild(newSectionDelete);
  return section;
};
