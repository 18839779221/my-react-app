import "./MusicPlayer.css";
import "../img/iconfont.js";
import React, { useEffect, useState } from "react";
import { formatDurationMMSS } from "../utils/format";

interface Props {
  className?: string;
}
interface State {
  playState: boolean;
  currentTime: number;
  duration: number;
}

export function MusicPlayer(props: Props) {
    
  const [state, setState] = useState<State>({
    playState: false,
    currentTime: 0,
    duration: 0,
  })

  let audioPlayer: HTMLAudioElement | null = null;

  useEffect(() => {
    audioPlayer = document.querySelector("#player-music-player");

  }, [])

  const onDurationChanged = () => {
    setState((prevState) => ({
      ...prevState,
      duration: audioPlayer?.duration || 0,
    }));
  };

  const onTimeUpdate = () => {
    setState((prevState) => ({
      ...prevState,
      currentTime: audioPlayer?.currentTime || 0,
    }));
  };

  function switchPlayState() {
    setState((prevState) => ({
      ...prevState,
      playState: !prevState.playState,
    }));
    if (!state.playState) {
      audioPlayer?.play();
    } else {
      audioPlayer?.pause();
    }
  }

  function playIcon() {
    if (state.playState) {
      return "#icon-shipinbofangshizanting";
    } else {
      return "#icon-shipinbofangshibofang";
    }
  }

  function getProgress() {
    if (state.duration == 0) return "0%";
    return `${(state.currentTime / state.duration) * 100}%`;
  }

  // 注意React.MouseEvent和MouseEvent不一样
  const seek = (event: React.MouseEvent) => {
    if (event.target instanceof Element && audioPlayer) {
        audioPlayer.currentTime = (event.nativeEvent.offsetX / event.target.clientWidth) * state.duration;
    }
  };

    return (
      <div className={`player-main ${props.className || ""}`}>
        {/* 播放按钮 */}
        <svg className="icon player-switch-icon" aria-hidden="true">
          <use xlinkHref="#icon-zuobofang"></use>
        </svg>
        <svg
          className="icon player-icon"
          aria-hidden="true"
          onClick={() => switchPlayState()}
        >
          <use xlinkHref={playIcon()}></use>
        </svg>
        <svg className="icon player-switch-icon" aria-hidden="true">
          <use xlinkHref="#icon-youbofang"></use>
        </svg>

        <a className="player-music-img" href=""></a>

        <div className="player-info-and-progress">
          <div>
            <a className="player-music-name">星光灿烂</a>
            <a className="player-singer-name">谭咏麟</a>
          </div>

          {/* 进度条 */}
          <div className="player-progress">
            <div className="player-progress-total" onClick={seek}>
              <div
                className="player-progress-current"
                style={{ width: `${getProgress()}` }}
              ></div>
              <span
                className="player-progress-indicator"
                style={{ left: `calc(${getProgress()} - 4px)` }}
              ></span>
            </div>
            <span className="player-progress-text">
              <span style={{ color: "#a1a1a1" }}>
                {formatDurationMMSS(state.currentTime)}&nbsp;
              </span>
              <span>
                &nbsp;/&nbsp;{formatDurationMMSS(state.duration)}
              </span>
            </span>
          </div>
        </div>

        <svg className="icon player-volume-icon" aria-hidden="true">
          <use xlinkHref="#icon-24gf-volumeZero"></use>
        </svg>
        <svg className="icon player-play-mode-icon" aria-hidden="true">
          <use xlinkHref="#icon-bofang-xunhuanbofang"></use>
        </svg>
        <svg className="icon player-play-list-icon" aria-hidden="true">
          <use xlinkHref="#icon-bofangliebiao"></use>
        </svg>
        <audio
          id="player-music-player"
          autoPlay
          onDurationChange={onDurationChanged}
          onTimeUpdate={onTimeUpdate}
          src="https://music.163.com/song/media/outer/url?id=1953828422.mp3"
        >
          Your browser does not support the <code>audio</code> element.
        </audio>
      </div>
    );
}
