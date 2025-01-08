import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5p9VzGZh4YfKucsG9H1xHxAUbaw9KyBY",
  authDomain: "tekweb-8d5fb.firebaseapp.com",
  projectId: "tekweb-8d5fb",
  storageBucket: "tekweb-8d5fb.appspot.com",
  messagingSenderId: "365789369167",
  appId: "1:365789369167:web:c7321e9de84722b2802b3a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
