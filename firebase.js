import {initializeApp} from 'firebase/app'
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDJM8a8t4yyN3eUst5p5U4OijYN4wf6p0k",
    authDomain: "pythonseven-965c3.firebaseapp.com",
    projectId: "pythonseven-965c3",
    storageBucket: "pythonseven-965c3.appspot.com",
    messagingSenderId: "888562168262",
    appId: "1:888562168262:web:fbc7a36eef1f20047042c7"
  };

let app;

app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export {db}
