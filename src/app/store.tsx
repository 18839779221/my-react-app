import { configureStore } from "@reduxjs/toolkit";
import playMusicReducer from "../music_player/playMusicSlice";

export default configureStore({
    reducer: {
        switchMusic: playMusicReducer
    }
}) 