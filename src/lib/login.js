// eslint-disable-next-line import/named
import { loginGoogle, loginUser } from '../firebase/firebase-fn.js';

export default () => {
  // const name = getCurrentUser().name;
  // const email = getCurrentUser().email;
  // const password = getCurrentUser().password;
  const loginSection = document.createElement('section');
  loginSection.className = 'loginSection';
  const viewLogin = `

  <section class="secLogoLogin">
    <img class="logoLogin" src="img/logo_muñeca.png" alt="Logo3B" />
    <h1>¡Bienvenidos a <strong>3B</strong>!</h1>
  </section>
  <form class="loginform" id="login">
      <p class="loginErrorMessage"></p>
      <section class="inputGroup">
        <p class="loginErrorMessage"></p>
        <label for="loginEmail" ></label>
        <input type="email" id="loginEmail" class="inputLogin" autofocus placeholder="correo electronico">
        <p class="loginErrorMessage"></p>
        <label for="loginPassword" ></label>
        <input type="password" id="loginPassword" class="inputLogin" autofocus placeholder="Contraseña">
      </section>
      <p class="loginButton">
        <button id="loginFormBtn" class="allButton" type="button">Iniciar Sesión</button>
      </p>
      <section class="loginGoogle">
          <p class="loginText"> O bien ingresa con...</p>
          <p class="loginGoogleImg"><img  src= "img/googleIcono.png" alt="Iniciar sesion Google"/></p>
      </section>
      <section class="optionRegister">
          <p class="optionRegisterText">No tienes una cuenta?
          <a class="formLink" href="#/registrate" id="linkCreateAccount"><span>Registrate<span></a>
          </p>
      </section>
  </form>`;

  loginSection.innerHTML = viewLogin;

  const login = loginSection.querySelector('#loginFormBtn');
  // funcionalidad para boton
  login.addEventListener('click', (event) => {
    event.preventDefault();
    // declarando  variables
    const loginEmail = loginSection.querySelector('#loginEmail').value;
    const loginPassword = loginSection.querySelector('#loginPassword').value;
    console.log(loginEmail, loginPassword);
    const errorMessageLogin = loginSection.getElementsByClassName('loginErrorMessage');
    function messageError(indice, message) {
      errorMessageLogin[indice].innerHTML = `${message}`;
    }

    loginUser(loginEmail, loginPassword)
      .then((result) => {
        // Signed in
        const user = result.user;
        // console.log(user, 61);
        // console.log(user.multiFactor, 62);
        // console.log(user.multiFactor.user, 63);
        // console.log(user.emailVerified, 64);

        if (user.emailVerified) {
          window.location.hash = '#/profile';
          // saveUser(user);
        } else {
          messageError(0, 'Por favor realiza la verificación de la cuenta en tu correo electrónico');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        // const errorMessage = error.message;
        console.log('error', error.message, 66);
        // messageError(2, error.message);
        switch (errorCode) {
          case 'auth/wrong-password':
            messageError(1, '');
            messageError(2, 'La contraseña no es válida o el usuario NO esta registrado‎');
            break;
          case 'auth/internal-error':
            messageError(1, '');
            messageError(2, 'Debes ingresar tu contraseña');
            break;
          case 'auth/invalid-email':
            messageError(2, '');
            messageError(1, 'El correo electrónico no tiene el formato válido');
            break;

          case 'auth/email-already-in-use':
            messageError(2, '');
            messageError(1, 'El correo electrónico ya esta registrado y está siendo usado por otra cuenta');
            break;
          case 'auth/user-not-found':
            messageError(2, '');
            messageError(1, 'El correo electrónico y la contraseña NO están registrados');
            break;
          default:
            messageError(0, error.message);
        }
      });
  });
  const btnLoginGoogle = loginSection.querySelector('.loginGoogleImg');

  // const validarEmail = () => {
  //   validationEmail().then(() => {
  //     // eslint-disable-next-line no-alert
  //     alert('se envio mensaje de verificacion');
  //   }).catch((e) => {
  //     console.log(e);
  //   });
  // };
  // ********function logueo email firebase******
  /* btnLoginGoogle.addEventListener('click', () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('creación de usuario', name);
      })
      .catch((e) => {
        console.log(e);
      });
  }); */

  /* const mail = document.getElementById('email').value;
  const password = document.getElementById('clave').value; */

  btnLoginGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    loginGoogle().then((result) => {
      console.log(result.user);
      if (result.user.emailVerified) {
        window.location.hash = '#/profile';
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log(user, user.displayName);
            console.log(user.displayName);
            console.log(user.uid);
          } else {
            console.log('error1');
          }
        });
      } else {
        window.location.hash = '#/';
      }
    }).catch((error) => {
      console.log(error);
    });
  });

  return loginSection;
};
