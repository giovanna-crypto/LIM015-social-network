/* eslint-disable no-undef */
const db = firebase.firestore();
export const catchUserInfo = (captureName, captureLastName, captureEmail, captureUid) => {
  db.collection('UserPruebaNadia').add({
    name: captureName,
    lastName: captureLastName,
    email: captureEmail,
    uid: captureUid,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      console.log(docRef);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

/* **********Función para crear y guardar post en la base de datos********** */

/* funcion para traer todos los post */
export const getEachPostUser = (id) => db.collection('postPruebaNadia')
  .where('uid', '==', id)
  .orderBy('time', 'desc');

// Metodo  (snapshot)
export const onSnapShot = () => {
  const getPostOnFirestore = db.collection('postPruebaNadia').onSnapshot();
  console.log(getPostOnFirestore);
  return getPostOnFirestore;
};
export const onSnapshot2 = () => {
  db.collection('postPruebaNadia')
    .onSnapshot((resultados) => {
      console.log(resultados.docs);
      const datos = resultados.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Todos los datos de la colección 'postPruebaNadia'", datos);
    });
};
onSnapshot2();

// para eliminar post
export const deletePost = (id) => db.collection('postPruebaNadia').doc(id).delete()
  .then(() => console.log('Documento borrado')) // Documento borrado
  .catch((error) => console.error('Error eliminando documento', error));

// para editar post
export const editarPosts = (postText, photoPost, emailPost, uidPost) => {
  const dataPost = db.collection('postPruebaNadia').doc();
  return dataPost.update({
    post: postText,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    photo: photoPost,
    email: emailPost,
    uid: uidPost,
  });
};

export function updatePosts() {
  return db.collection('postPruebaNadia').doc(doc.uid).update({
    post: postText,
    time: new Date().toLocaleString('en-ES'),
  }).then(() => {
    console.log('post actualizado');
  })
    .catch((error) => {
      console.error('ocurrio un error al actualizar el post', error);
    });
}
