import { auth, db } from "@/firebase/firebase"
import { doc, setDoc } from "firebase/firestore"

export const updateFirebase = (bookmarkedList) => {
  // firebase 업데이트
  auth?.currentUser && (
    setDoc(doc(db, "bookmarked", auth.currentUser.uid), {
      userId : auth.currentUser.uid,
      userEmail : auth.currentUser.email,
      ...bookmarkedList
    })
  )
}