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
export const createPost = (postText, photoPost, emailPost, namePost, uidPost) => {
  // const fieldValue = firebase.firestore.FieldValue;
  db.collection('postPruebaNadia').doc().set({
    post: postText,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    photo: photoPost,
    email: emailPost,
    name: namePost,
    uid: uidPost,
  }).then(() => {
    console.log('publicacion exitosa');
  })
    .catch((error) => {
      console.error(`Error creando el post => ${error}`);
    });
};

/* Para leer post */
export const getAllPost = db.collection('postPruebaNadia').orderBy('time', 'desc');

/* funcion para traer todos los post del usuario actual */
export const getEachPostUser = (id) => db.collection('postPruebaNadia')
  .where('uid', '==', id)
  .orderBy('time', 'desc');

/* export const allPost = () => db.collection('postPruebaNadia')
  .onSnapshot((resultados) => {
    console.log(resultados.docs);
    const datos = resultados.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return datos;
    //   console.log("Todos los datos de la colección 'postPruebaNadia'", datos);
    //  const nuevoDato = datos.map((item) => {
    //    console.log(item.post);
    //    return item.post;
    //  });
    //  return nuevoDato;
  });
    });
}; */

// para eliminar post
export const deletePost = (id) => db.collection('postPruebaNadia').doc(id).delete()
  .then(() => console.log('Documento borrado')) // Documento borrado
  .catch((error) => console.error('Error eliminando documento', error));

// para editar post
/* export const editarPosts = (postText, photoPost, emailPost, uidPost) => {
  const dataPost = db.collection('postPruebaNadia').doc();
  return dataPost.update({
    post: postText,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    photo: photoPost,
    email: emailPost,
    uid: uidPost,
  });
}; */

export function updatePosts() {
  return db.collection('postPruebaNadia').doc(uid).update({
    post: postText,
    time: new Date().toLocaleString('en-ES'),
  }).then(() => {
    console.log('post actualizado');
  })
    .catch((error) => {
      console.error('ocurrio un error al actualizar el post', error);
    });
}
