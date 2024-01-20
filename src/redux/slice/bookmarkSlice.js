import { auth, db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  amenitiesBookmarkedList : [],
  foodBookmarkedList : [],
  gasStationBookmarkedList : [],
  parkingBookmarkedList : [],
  storageId : "",
}

const bookmarkSlice = createSlice({
  name : 'bookmark',
  initialState,
  reducers : {
    SET_AMENITIES_BOOKMARK : (state, action) => {
      const { svarCd, svarNm, svarAddr, isBookmarked } = action.payload;

      // 객체에 즐겨찾기 하고자 하는 항목이 있는지 확인
      const index = state.amenitiesBookmarkedList.findIndex(obj => obj.svarCd === svarCd);
      let result = '';

      // 존재하면 제거, 존재하지 않으면 추가
      if (index !== -1) {
        state.amenitiesBookmarkedList.splice(index, 1);
        result = 'remove'
      } else {
        const tempArr = [ 
          ...state.amenitiesBookmarkedList, 
          {svarCd, svarNm, svarAddr, isBookmarked : !isBookmarked} 
        ];
        state.amenitiesBookmarkedList = tempArr;
        result = 'add'
      }

      // firebase 업데이트
      auth?.currentUser && (
        setDoc(doc(db, "bookmarked", auth.currentUser.uid), {
            userId : auth.currentUser.uid,
            userEmail : auth.currentUser.email,
            amenities : state.amenitiesBookmarkedList,
            food : state.foodBookmarkedList,
            gasStation : state.gasStationBookmarkedList,
            parking : state.parkingBookmarkedList,
          })
          .then(
            result === 'add' ? toast.success("즐겨찾기에 추가했습니다.") : toast.success("즐겨찾기에서 삭제했습니다.")
          )
      )
    },

    SET_FOOD_BOOKMARK : (state, action) => {
      const { svarCd, svarNm, svarAddr, isBookmarked } = action.payload;

      // 객체에 즐겨찾기 하고자 하는 항목이 있는지 확인
      const index = state.foodBookmarkedList.findIndex(obj => obj.svarCd === svarCd);
      let result = '';

      // 존재하면 제거, 존재하지 않으면 추가
      if (index !== -1) {
        state.foodBookmarkedList.splice(index, 1);
        result = 'remove'
      } else {
        const tempArr = [ 
          ...state.foodBookmarkedList, 
          {svarCd, svarNm, svarAddr, isBookmarked : !isBookmarked} 
        ];
        state.foodBookmarkedList = tempArr;
        result = 'add'
      }

      // firebase 업데이트
      auth?.currentUser && (
        setDoc(doc(db, "bookmarked", auth.currentUser.uid), {
            userId : auth.currentUser.uid,
            userEmail : auth.currentUser.email,
            amenities : state.amenitiesBookmarkedList,
            food : state.foodBookmarkedList,
            gasStation : state.gasStationBookmarkedList,
            parking : state.parkingBookmarkedList,
          })
          .then(
            result === 'add' ? toast.success("즐겨찾기에 추가했습니다.") : toast.success("즐겨찾기에서 삭제했습니다.")
          )
      )
    },

    SET_GASSTATION_BOOKMARK : (state, action) => {
      const { svarCd, svarNm, svarAddr, isBookmarked } = action.payload;

      // 객체에 즐겨찾기 하고자 하는 항목이 있는지 확인
      const index = state.gasStationBookmarkedList.findIndex(obj => obj.svarCd === svarCd);
      let result = '';

      // 존재하면 제거, 존재하지 않으면 추가
      if (index !== -1) {
        state.gasStationBookmarkedList.splice(index, 1);
        result = 'remove'
      } else {
        const tempArr = [ 
          ...state.gasStationBookmarkedList, 
          {svarCd, svarNm, svarAddr, isBookmarked : !isBookmarked} 
        ];
        state.gasStationBookmarkedList = tempArr;
        result = 'add'
      }

      // firebase 업데이트
      auth?.currentUser && (
        setDoc(doc(db, "bookmarked", auth.currentUser.uid), {
            userId : auth.currentUser.uid,
            userEmail : auth.currentUser.email,
            amenities : state.amenitiesBookmarkedList,
            food : state.foodBookmarkedList,
            gasStation : state.gasStationBookmarkedList,
            parking : state.parkingBookmarkedList,
          })
          .then(
            result === 'add' ? toast.success("즐겨찾기에 추가했습니다.") : toast.success("즐겨찾기에서 삭제했습니다.")
          )
      )
    },
    
    SET_PARKING_BOOKMARK : (state, action) => {
      const { svarCd, svarNm, svarAddr, isBookmarked } = action.payload;

      // 객체에 즐겨찾기 하고자 하는 항목이 있는지 확인
      const index = state.parkingBookmarkedList.findIndex(obj => obj.svarCd === svarCd);
      let result = '';

      // 존재하면 제거, 존재하지 않으면 추가
      if (index !== -1) {
        state.parkingBookmarkedList.splice(index, 1);
        result = 'remove'
      } else {
        const tempArr = [ 
          ...state.parkingBookmarkedList, 
          {svarCd, svarNm, svarAddr, isBookmarked : !isBookmarked} 
        ];
        state.parkingBookmarkedList = tempArr;
        result = 'add'
      }

      // firebase 업데이트
      auth?.currentUser && (
        setDoc(doc(db, "bookmarked", auth.currentUser.uid), {
            userId : auth.currentUser.uid,
            userEmail : auth.currentUser.email,
            amenities : state.amenitiesBookmarkedList,
            food : state.foodBookmarkedList,
            gasStation : state.gasStationBookmarkedList,
            parking : state.parkingBookmarkedList,
          })
          .then(
            result === 'add' ? toast.success("즐겨찾기에 추가했습니다.") : toast.success("즐겨찾기에서 삭제했습니다.")
          )
      )
    },

  }
})

export const {
  SET_AMENITIES_BOOKMARK, 
  SET_FOOD_BOOKMARK, 
  SET_GASSTATION_BOOKMARK, 
  SET_PARKING_BOOKMARK,
  SET_DATA_FROM_FIREBASE
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;