const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  allHighwayInfo : [],  // 모든 정보
  filteredInfo : [],    // 필터링된 정보
  currentPage : 1,      // 현재 페이지
  infoPerPage : 7,      // 한 페이지 당 보여줄 정보의 개수
}

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    SET_ALL_INFO: (state, action)=>{
      const res = action.payload;

      // 문자 정렬
      const temp = res.data.list.sort((a, b) => {
        const nameA = a.svarNm;
        const nameB = b.svarNm;
      
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
      });

      state.allHighwayInfo = temp
    },

    SET_FILTERED_INFO: (state, action)=>{
      state.filteredInfo = action.payload;
    },

    SET_CURRENT_PAGE: (state, action)=>{
      state.currentPage = action.payload;
    },
  }
})

export const { SET_ALL_INFO, SET_FILTERED_INFO, SET_CURRENT_PAGE } = infoSlice.actions;
export const selectAllHighwayInfo = (state)=>state.info.allHighwayInfo;
export const selectFilteredInfo = (state)=>state.info.filteredInfo;
export const selectCurrentPage = (state)=>state.info.currentPage;
export const selectInfoPerPage = (state)=>state.info.infoPerPage;

export default infoSlice.reducer;