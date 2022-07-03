import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentIndex: 0,
  playList: [],
};

const playMusicSlice = createSlice({
  name: "playMusic",
  initialState: initialState,
  reducers: {
    switchMusic: (state, action) => {
      state.currentIndex++;
    },
    updatePlayList: (state, action) => {
      state.playList = action.payload;
    },
  },
});

export const { switchMusic, updatePlayList } = playMusicSlice.actions;

export default playMusicSlice.reducer;
