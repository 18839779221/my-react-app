import { createSlice, Dispatch } from "@reduxjs/toolkit";

interface State {
  currentIndex: number,
  playList: [
    {
      id: number
    }
  ],
};

const playMusicSlice = createSlice({
  name: "playMusic",
  initialState: {
    currentIndex: 0,
    playList: [],
  },
  reducers: {
    switchMusic: (state, action) => {
      state.currentIndex++;
    },
    updatePlayList: (state, action) => {
      state.playList = action.payload;
    },
  },
});

const updatePlayListByPlayListId = (playListId: number) => {
  return (dispatch: Dispatch) => {

  }

}

export const selectCurrentMusic = (state: State) => state.playList[state.currentIndex];

export const { switchMusic, updatePlayList } = playMusicSlice.actions;

export default playMusicSlice.reducer;
