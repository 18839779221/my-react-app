import "./MusicPlayer.css";
import "../img/iconfont.js";
import React, { useEffect, useRef, useState } from "react";
import { formatDurationMMSS } from "../utils/format";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentMusic, selectPlayMusic, switchMusicAction, updateCurrentMusicWithUrlAction } from "./playMusicSlice";
import request from "../utils/request";
import { CommonDateListModel, MusicDetailModel } from "../model/model";

interface Props {
  className?: string;
}

export function MusicPlayer(props: Props) {
    
  const [playState, setPlayState] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)

  let dispatch = useDispatch()

  let playMusicInfo = useSelector(selectPlayMusic)
  let currentMusic = useSelector(selectCurrentMusic)

  let audioPlayer = useRef<HTMLAudioElement | null>(null);

  // useEffect(() => {
  //   if (!audioPlayer.current) {
  //     audioPlayer.current = document.querySelector("#player-music-player");
  //   }
  // }, [])

  useEffect(() => {
    if (!currentMusic) return
    // request({
    //   url: '/song/detail',
    //   params: {
    //     ids: currentMusic.id,
    //   }
    // }).then((res: MusicDetailResModel) => {
    //   if (res.songs.length == 0) return
    //   setState((prevState) => ({
    //     ...prevState,
    //     music: {
    //       ...prevmusic,
    //       ...res.songs[0]
    //     }
    //   }))
    // })

    if (currentMusic.url) return
    request({
      url: '/song/url',
      params: {
        id: currentMusic.id,
      }
    }).then((res: CommonDateListModel<MusicDetailModel>) => {
      if (res.data.length == 0) return
      dispatch(updateCurrentMusicWithUrlAction(res.data[0]))
    })
  }, [currentMusic])

  const onDurationChanged = () => {
      setDuration(audioPlayer.current?.duration || 0)
  };

  const onTimeUpdate = () => {
      setCurrentTime(audioPlayer.current?.currentTime || 0)
  };

  function switchPlayState() {
    if (!playState) {
      audioPlayer.current?.play();
    } else {
      audioPlayer.current?.pause();
    }
  }

  function playIcon() {
    if (playState) {
      return "#icon-shipinbofangshizanting";
    } else {
      return "#icon-shipinbofangshibofang";
    }
  }

  function getProgress(): string {
    if (duration == 0) return "0%";
    return `${(currentTime / duration) * 100}%`;
  }

  // 注意React.MouseEvent和MouseEvent不一样
  const seek = (event: React.MouseEvent) => {
    if (event.target instanceof Element && audioPlayer.current) {
        audioPlayer.current.currentTime = (event.nativeEvent.offsetX / event.target.clientWidth) * duration;
    }
  };

  const switchMusic = (offset: number) => {
    dispatch(switchMusicAction(playMusicInfo.currentIndex+offset))
  }

  const getMusicImg = (): string => {
    if (currentMusic?.al.picUrl) {
      return `url(${currentMusic?.al.picUrl}) center center / cover no-repeat`
    } else {
      return "wheat"
    }
  }

    return (
      <div className={`player-main ${props.className || ""}`}>
        {/* 播放按钮 */}
        <svg className="icon player-switch-icon" aria-hidden="true" onClick={(e) => switchMusic(-1)}>
          <use xlinkHref="#icon-zuobofang"></use>
        </svg>
        <svg
          className="icon player-icon"
          aria-hidden="true"
          onClick={() => switchPlayState()}
        >
          <use xlinkHref={playIcon()}></use>
        </svg>
        <svg className="icon player-switch-icon" aria-hidden="true" onClick={(e) => switchMusic(1)}>
          <use xlinkHref="#icon-youbofang"></use>
        </svg>

        <a className="player-music-img" href="" style={{background: getMusicImg()}}></a>

        <div className="player-info-and-progress">
          <div>
            <a className="player-music-name">{currentMusic?.name}</a>
            <a className="player-singer-name">{currentMusic?.ar[0].name || "未知"}</a>
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
                {formatDurationMMSS(currentTime)}&nbsp;
              </span>
              <span>
                &nbsp;/&nbsp;{formatDurationMMSS(duration)}
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
          onEnded={() => switchMusic(1)}
          onPlay={() => setPlayState(true)}
          onPause={() => setPlayState(false)}
          src={currentMusic?.url}
          ref={audioPlayer}
        >
          Your browser does not support the <code>audio</code> element.
        </audio>
      </div>
    );
}
