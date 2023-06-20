// Import the functions you need from the SDKs you need
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase, onChildAdded, onValue, push, ref, set } from "firebase/database";


import { DocumentData, DocumentReference, FieldValue, arrayUnion, doc, getDoc, getFirestore, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { ISong } from "./pages/types/ZingMP3Response.type";
import { useRouter } from "next/router";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBN8KwCmNafhnwfRDpn5As8Fh6ARc50MkU",
    authDomain: "music-app-1cb40.firebaseapp.com",
    databaseURL: "https://music-app-1cb40-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "music-app-1cb40",
    storageBucket: "music-app-1cb40.appspot.com",
    messagingSenderId: "846023789687",
    appId: "1:846023789687:web:4e319883c6f25c7c1dca72"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase();




const provider = new GoogleAuthProvider();
const handleLogin=async()=>{
  await signInWithPopup(auth, provider)
}
const handleLogout=async()=>{
  await signOut(auth).then(() => {
    toast.success("Đăng xuất thành công")
    console.log("Đăng xuất thành công")
  }).catch((error) => {
    toast.error(error.message)
  });
}

const addComment = async (movieId:string, comment:string) => {
  const postListRef = ref(database, `comments/${movieId}`);
  const newCommentRef = push(postListRef);
  await set(newCommentRef,{
    comment: comment,
    createdAt: new Date().toISOString(),
    user: {
      id: auth.currentUser?.uid,
      name: auth.currentUser?.displayName,
      photo: auth.currentUser?.photoURL
    }
  })

  

}

const getComments=async(movieId:string,cb:any)=>{
  const dbRef = ref(database, `comments/${movieId}`);

  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    data && cb(Object.values(data));
  });
}

const addWishList=async(item:ISong)=>{
    const wishListRef = ref(database, `wishlist/${auth.currentUser?.uid}`);
    const newWishListRef = push(wishListRef);
    await set(newWishListRef,{
      song: item,
      createdAt: new Date().toISOString(),
    })
}
const getWishList = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const wishlistRef = ref(database, `wishlist/${auth.currentUser?.uid}`);
      onValue(wishlistRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      }, (error) => {
        reject(error);
      });
    });
  };
  
export {
  auth,
  handleLogin,
  handleLogout,
  addWishList,
  getWishList
}