const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  bookmarkList : [],
}

const bookmarkSlice = createSlice({
  name : 'bookmark',
  initialState,
  reducers : {
    SET_BOOKMARKED_INFO : (state, action) => {
      const {svarCd, svarNm, svarAddr} = action.payload;
      const tempArr = [
        ...state.bookmarkList,
        {svarCd, svarNm, svarAddr}
      ];
      state.bookmarkList = tempArr;
    }
  }
})

export const selectBookmarkList = (state) => state.bookmark.bookmarkList;
export const {SET_BOOKMARKED_INFO} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;