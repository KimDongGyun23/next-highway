'use client'
import Image from "next/image";
import mainImg from "@/assets/mainbg.jpg"
import styles from "./home.module.scss"
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { SET_DATA_FROM_FIREBASE } from "@/redux/slice/bookmarkSlice";

const getFirebaseData = async (dispatch) => {
  const docSnap = await getDoc(doc(db, "bookmarked", auth.currentUser.uid));

  if (docSnap.exists()) {
    dispatch(SET_DATA_FROM_FIREBASE(docSnap.data()));
    console.log("문서 데이터:", docSnap.data());
  } else {
    console.log("해당 문서가 없습니다!");
  }
}

export default function Home() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        getFirebaseData(dispatch);
      }
    });
  }, []);
  
  return (
    <main className={styles.main}>
      <div className={styles.image}>
        <Image src={mainImg} alt="main-bg" />
      </div>

      <div className={styles.title}>
        <p>당신의 여행 쉼터,</p><p>우리가 책임지겠습니다.</p>
      </div>
    </main>
  )
}
