import { auth, db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  bookmarkList : [],
  storageId : "",
}

const updateStorage = async (user, tempArr) => {
  setDoc(doc(db, "bookmarked", user.uid), {
    userId : user.uid,
    userEmail : user.email,
    bookmarkList : tempArr,
  });
}

const bookmarkSlice = createSlice({
  name : 'bookmark',
  initialState,
  reducers : {
    SET_BOOKMARKED_INFO : (state, action) => {
      const {svarCd, svarNm, svarAddr, isBookmarked} = action.payload;
      const index = state.bookmarkList.findIndex(obj => obj.svarCd === svarCd);

      if (index !== -1) {
        state.bookmarkList.splice(index, 1);
      } else {
        const tempArr = [ ...state.bookmarkList, {svarCd, svarNm, svarAddr, isBookmarked : !isBookmarked} ];
        state.bookmarkList = tempArr;

        { auth?.currentUser && updateStorage(auth.currentUser, tempArr).then(toast.success("즐겨찾기에 추가했습니다.")) }
      }
    }
  }
})

export const selectBookmarkList = (state) => state.bookmark.bookmarkList;
export const {SET_BOOKMARKED_INFO} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;