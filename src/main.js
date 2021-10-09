import { login, logout } from './firebase/firebase-fn.js';

const buttonLogin = document.querySelector('#btn-Google');
const buttonLogout = document.querySelector('#btn-OutLog ');
// let para mantener la variable del usuario logueado
let currentUser;
// metodo para saber si el usuario esta logueado o no
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    console.log('Usuario logueado', currentUser.displayName);
  }
});

buttonLogin.addEventListener('click', async (e) => {
  try {
    currentUser = await login();
  } catch (error) {
    console.log(e);
  }
});

buttonLogout.addEventListener('click', async (e) => {
  logout();
  console.log(e, 'no hay usuarios logueados');
});
