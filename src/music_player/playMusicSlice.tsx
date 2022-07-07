import {
  createSelector,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { stat } from "fs";
import { MusicDetailModel } from "../model/model";

interface State {
  currentIndex: number;
  playList: MusicDetailModel[];
  // currentMusic?: MusicDetailModel,
}

const initialState: State = {
  currentIndex: 0,
  playList: [],
};

const playMusicSlice = createSlice({
  name: "playMusic",
  initialState: initialState,
  reducers: {
    switchMusicAction: (state, action: PayloadAction<number>) => {
      let newIndex = action.payload;
      if (!state.playList || state.playList.length == 0) return;
      let length = state.playList.length;
      while(newIndex<0) {
        newIndex += length;
      }
      newIndex = newIndex % length;
      state.currentIndex = newIndex;
    },
    updatePlayListAction: (state, action: PayloadAction<MusicDetailModel[]>) => {
      state.playList = action.payload;
    },
    updateCurrentMusicWithUrlAction(state, action: PayloadAction<MusicDetailModel>) {
      let currentMusic = getCurrentMusic(state);
      console.log(action.payload);
      if (currentMusic) {
        currentMusic.url = action.payload.url;
        // currentMusic = {
        //   ...currentMusic,
        //   ...action.payload
        // }
      }
    },
  },
});

const getCurrentMusic = (playMusic: State) =>
  playMusic.playList[playMusic.currentIndex] || null;

export const selectPlayMusic = (state: { playMusic: State }) => state.playMusic;

export const selectCurrentMusic = createSelector(
  [selectPlayMusic],
  getCurrentMusic
);

export const { switchMusicAction, updatePlayListAction, updateCurrentMusicWithUrlAction } =
  playMusicSlice.actions;

export default playMusicSlice.reducer;
