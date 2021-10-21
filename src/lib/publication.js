// eslint-disable-next-line import/named
import { getCurrentUser, getDate } from '../firebase/firebase-fn.js';
import { getEachPostUser } from '../firebase/firestore.js';
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
      <img id="userPhoto" src= ${photo === null ? '../img/chica.jpg' : photo} width="40px" height="40px" alt="Foto de perfil">
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
    const collection = getEachPostUser(uniqueId);
    const publicPost = writeAndReadPost.querySelector('.allPublicPost');
    collection.onSnapshot((item) => {
      publicPost.innerHTML = '';
      item.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        console.log(doc.data().post);
        const readPostSection = document.createElement('section');
        readPostSection.className = 'publicPost';
        readPostSection.innerHTML = `
        <section id="userWhoPosted">
          <section class="infoUserWhoPosted">
            <img id ="userPhoto" src= ${photo === null ? '../img/chica.jpg' : photo} width="20px" height="20px" alt="Foto de perfil">
            <p class="userName">${name == null ? email : name}</p>
            </section>
          <section id="userContentPosted">
            <p id='${doc.id}' class="textPosted">${doc.data().post}</p>
            <p id='${doc.id}' class="datePosted">${getDate(doc.data().time.toDate())}</p>
          </section>
          <section id="likeToPost">
          <button type="button" id='${doc.id}' class="btnLike">Like </button>
          <p type="text">0</p>
          </section>
          <section id="commentSec"><section id="commentando">
          <img class="userPhotoComment" src="${getCurrentUser().photo === null ? '../img/chica.jpg' : getCurrentUser().photo}" width= "25">
          <form class="formComenta">
            <input id="commentText-${doc.id}" class="icontextComment" placeholder="Escribe tu comentario..."></input>
            <section id="userContentComment">
            <p id='${doc.id}' class="textComment">${doc.data().comment}</p>
            <p id='${doc.id}' class="dateComment">${getDate(doc.data().time.toDate())}</p>
          </section>
            <button type="button" id='comentarPost'>Comentar</button>
          </section>
        </section>`;

        // console.log(publicPost);
        // publicPost.innerHTML += readPost;
        publicPost.appendChild(readPostSection);
      });
    });
  };
  getPost();
  const btnComentar = writeAndReadPost.querySelector('#comentarPost');
  console.log(btnComentar);

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
      const createPost = (postText, photoPost, emailPost, uidPost) => {
        // createPost(contentTextPost, photo, email, uniqueId)
        const db = firebase.firestore();
        db.collection('postPruebaNadia').doc().set({
          post: postText,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          photo: photoPost,
          email: emailPost,
          uid: uidPost,
        })
          .then(() => {
            console.log('publicacion exitosa');
          })
          .catch((error) => {
            console.error(`Error creando el post => ${error}`);
          });
        getPost();
      };
      createPost(contentTextPost, photo, email, uniqueId);
      writeAndReadPost.querySelector('#contentTextPost').value = '';
    }
  });

  return writeAndReadPost;
};
