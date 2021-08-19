import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAL5PqilcVxNRAJkFgkOlA6a467Dx6Cd04",
    authDomain: "anime-list-vue.firebaseapp.com",
    projectId: "anime-list-vue",
    storageBucket: "anime-list-vue.appspot.com",
    messagingSenderId: "900814822678",
    appId: "1:900814822678:web:b5a542d6347ffabcf38437"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const profileCollection = db.collection('profile')
const animesCollection = db.collection('animes')

export {
    db, auth, profileCollection, animesCollection
}