const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  bookmarkList : [],
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
      }
    }
  }
})

export const selectBookmarkList = (state) => state.bookmark.bookmarkList;
export const {SET_BOOKMARKED_INFO} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;