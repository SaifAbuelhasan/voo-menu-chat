import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtpw7j1-ZxHvMsKkO381o95IkkcAmKx0Y",
  authDomain: "vooofortest.firebaseapp.com",
  databaseURL: "https://vooofortest-default-rtdb.firebaseio.com",
  projectId: "vooofortest",
  storageBucket: "vooofortest.appspot.com",
  messagingSenderId: "72763494086",
  appId: "1:72763494086:web:3075e6938d98ec6ed251c7",
  measurementId: "G-ZMTRG8J13Y",
};

initializeApp(firebaseConfig);

export default getFirestore();
