import { getCurrentUser } from '../firebase/firebase-fn.js';
// eslint-disable-next-line import/named
import {
  createPost, deletePost, updatePosts, getAllPost,
} from '../firebase/firestore.js';
// import { createPost, getPost, getCurrentUser } from '../firebase/firebase-fn.js';

export default () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      const uid = user.uid;
      console.log(uid);
    } else {
      // User is signed out
      console.log('no has iniciado sesión');
    }
  });
  const name = getCurrentUser().name;
  const uniqueId = getCurrentUser().uid;
  const photo = getCurrentUser().photo;
  const email = getCurrentUser().email;

  // console.log(uniqueId);
  // creando seccion de publicar y leer contenido
  const writeAndReadPost = document.createElement('article');
  writeAndReadPost.className = 'userCreateAndReadPost';

  const textToPost = `
  <section class="postBoxWrite" id="postWrite">
    <section class="userWhoPost">
      <img id="userPhoto" src= ${photo !== null ? photo : '../img/chica.jpg'} width="40px" height="40px" alt="Foto de perfil">
      <p class="userName">${name == null ? email : name}</p>
    </section>
    <section class="userContentPost">
          <textarea id='contentTextPost'class='postArea' type="text" cols="20" row="20"  maxlength="200" placeholder="¿Que deseas compartir hoy?"></textarea>
          <button type="button" id='compartirPost'>Compartir</button>
    </section>
    <section class="emojies"> </section>
  </section>
  <!-- SECCION DE  PUBLICACIONES / LO QUE SE POSTEO TODOS-->
  <section class="allPublicPost"></section>`;

  writeAndReadPost.innerHTML = textToPost;
  /* PARA MOSTRAR LAS PUBLICACIONES HECHAS */
  const getPost = () => {
    const publicPost = writeAndReadPost.querySelector('.allPublicPost');
    /* const collection = getEachPostUser(uniqueId);
    console.log(collection);
    collection.onSnapshot((item) => {
      publicPost.innerHTML = '';
      item.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        console.log(doc.data().post); */
    // seguunda prueba

    getAllPost.onSnapshot((resultados) => {
      publicPost.innerHTML = '';
      console.log(resultados.docs);
      const datos = resultados.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Todos los datos de la colección 'postPruebaNadia'", datos);
      datos.forEach((doc) => {
        // console.log(doc.id);
        const readPostSection = document.createElement('section');
        readPostSection.className = 'publicPost';
        readPostSection.innerHTML = `
        <section id="userWhoPosted">
          <section class="infoUserWhoPosted">
            <img id ="userPhoto" src= ${doc.photo === null ? '../img/chica.jpg' : doc.photo} width="20px" height="20px" alt="Foto de perfil">
            <p class="userName">${doc.name === null ? doc.email : doc.name}</p>
            </section>
          <section id="userContentPosted">
            <p id='${doc.uid}' class="textPosted">${doc.post}</p>
            <p id='${doc.uid}' class="datePosted">tiempo</p>
          </section>
          <section id="likeToPost">
          <button type="button" id='${doc.uid}' class="btnLike">Like </button>
          <button type="button" id='${doc.uid}' class="btnDelete">Delete </button>
          <button type="button" id='${doc.uid}' class="btnEdit" >Edit </button>
          <p type="text">0</p>
          </section>
        </section>`;

        // console.log(publicPost);
        // publicPost.innerHTML += readPost;
        // return publicPost.appendChild(readPostSection);
        // });
        const btnDelete = readPostSection.querySelector('.btnDelete');
        // console.log(btnDelete);
        // eliminar post
        btnDelete.addEventListener('click', () => {
          if (email === doc.email) {
            // eslint-disable-next-line no-alert
            const confirmar = window.confirm('¿Estás seguro de que deseas borrar este post?');
            if (confirmar) {
              deletePost(doc.id);
              console.log(deletePost(doc.id));
            }
          } else {
            console.log('no funciona');
          }
        });

        const btnEdit = readPostSection.querySelector('.btnEdit');

        btnEdit.addEventListener('click', () => {
          const idPost = doc.uid;
          const publication = writeAndReadPost.querySelector('#contentTextPost');
          // publication.readOnly = false;
          const btnGuardar = writeAndReadPost.querySelector('#compartirPost');
          btnGuardar.innerHTML = 'Guardar';
          publication.value = doc.post;
          writeAndReadPost.querySelector('#contentTextPost').innerHTML = publication;

          btnGuardar.addEventListener('click', () => {
            const nuevoText = writeAndReadPost.querySelector('#contentTextPost').value;
            const actualizacionpost = updatePosts(idPost, nuevoText);
            /* .then(() => {
                publication.innerHTML = nuevoText;
              }); */
            return actualizacionpost;
          });
        });
        publicPost.appendChild(readPostSection);
      });
    });
  };
  getPost();

  const btnCompartir = writeAndReadPost.querySelector('#compartirPost');
  // console.log(btnCompartir);
  btnCompartir.addEventListener('click', (e) => {
    e.preventDefault();
    const contentTextPost = writeAndReadPost.querySelector('#contentTextPost').value;
    console.log(contentTextPost);
    if (contentTextPost === '') {
      // eslint-disable-next-line no-alert
      alert('Por ingrese contenido a su publicación');
    } else {
      createPost(contentTextPost, photo, email, name, uniqueId);

      getPost();
    }
    writeAndReadPost.querySelector('#contentTextPost').value = '';
    // }
  });

  return writeAndReadPost;
};
