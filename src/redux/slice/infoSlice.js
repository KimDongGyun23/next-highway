const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  allHighwayInfo : [],
  filteredInfo : [],
  currentPage : 1,
  infoPerPage : 7,
}

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    SET_ALL_INFO: (state, action)=>{
      state.allHighwayInfo = action.payload;
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