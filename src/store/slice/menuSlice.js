const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  isActive : false
}

const menuSlice = createSlice({
  name : "menu",
  initialState,
  reducers : {
    toggleMenu : (state, action) => {
      state.isActive = action.payload
    }
  }
})

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;