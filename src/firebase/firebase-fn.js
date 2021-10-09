// función para logearse con google
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export async function login() {
  try {
    const response = await auth.signInWithPopup(provider);
    console.log(response);
    return response.user;
  } catch (error) {
    throw new Error(error);
  }
}

// funcion para cerrar sesion
export function logout() {
  firebase.auth().signOut();
}
