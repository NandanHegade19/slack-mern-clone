import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBi_8LW6LJ0ad0POxFRAZ9k2lqS0jvBNrY",
  authDomain: "slack-mern-clone-c7b2d.firebaseapp.com",
  databaseURL: "https://slack-mern-clone-c7b2d.firebaseio.com",
  projectId: "slack-mern-clone-c7b2d",
  storageBucket: "slack-mern-clone-c7b2d.appspot.com",
  messagingSenderId: "499975271508",
  appId: "1:499975271508:web:cbd252ef8802f87f5ea9c1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

//const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
//export default db