import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faBackwardStep,
  faCirclePause,
  faForwardStep,
  faRepeat,
  faShuffle,
  faVolumeDown,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  ISong,
  IURLSong,
  ZingMp3Response,
} from "../types/ZingMP3Response.type";
import {
  setLoop,
  setPlay,
  setPlayMusic,
  setShuffle,
} from "@/features/playMusicSlice";
import AudioPlayer from "./AudioPlayer";
import axios from "axios";
import { convertDuration } from "@/utils/time";
import { addWishList, auth, handleLogin } from "@/firebase";
import { toast } from "react-toastify";
export default function MusicPlayer() {
  const { currentPlay, isPlaying, playlist, loop, shuffle } = useAppSelector(
    (state) => state.playMusic
  );
  const [url, setUrl] = useState<IURLSong>();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    async function getSong() {
      if(currentPlay.encodeId){
        try {
          const { data }: ZingMp3Response = await axios.get(
            `/api/song/${currentPlay.encodeId}`
          );
          setUrl(data.data);
        } catch (e) {
          console.log(e);
        }
      }
    }
    getSong();
    return () => {
      setUrl(undefined);
    };
  }, [currentPlay]);


  const dispatch = useAppDispatch();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const handlePlay = () => {
    if (!isPlaying) {
    dispatch(setPlayMusic(true));
      audioRef.current?.play();
    } else {
      dispatch(setPlayMusic(false));
      audioRef.current?.pause();
    }
  };
  const setVolume = (volume: number) => {
    if (audioRef.current) {
        audioRef.current.volume = Math.min(Math.max(volume, 0), 1);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, [isPlaying, audioRef.current, url, currentPlay]);

  const handleNext = () => {
    const index = playlist.findIndex(
      (item) => item.encodeId === currentPlay.encodeId
    );
    if (index === playlist.length - 1) {
      dispatch(setPlayMusic(true));
      dispatch(setPlay(playlist[0]));
    } else {
      dispatch(setPlayMusic(true));
      dispatch(setPlay(playlist[index + 1]));
    }
  };
  const handlePrevious = () => {
    const index = playlist.findIndex(
      (item) => item.encodeId === currentPlay.encodeId
    );
    if (index === 0) {
      dispatch(setPlayMusic(true));
      dispatch(setPlay(playlist[playlist.length - 1]));
    } else {
      dispatch(setPlayMusic(true));
      dispatch(setPlay(playlist[index - 1]));
    }
  };
  const handleLoop = () => {
    dispatch(setLoop());
  };
  const handleShuffle = () => {
    dispatch(setShuffle());
  };
  const handleEnded = () => {
    dispatch(setPlayMusic(false));
    if(loop) {
      if(audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        dispatch(setPlayMusic(true));
      }
    }
    if (shuffle) {
      const index = Math.floor(Math.random() * playlist.length)
      dispatch(setPlayMusic(true));
      dispatch(setPlay(playlist[index]));
    } 
    if(!loop && !shuffle) {
      handleNext();
    }
  };
  const handleAddWishList =()=>{
    if(!auth.currentUser ){
      handleLogin();
    }else{
      addWishList(currentPlay)
      toast.success("Đã thêm vào danh sách yêu thích")
    }
  }
  return (
    <div className="min-w-full fixed bottom-0 z-50 flex items-center justify-between max-h-[12rem] bg-[#130C1C] px-5 min-h-[84px]">
      <div className="w-3/12 py-3 flex items-center">
        <img
          className="max-w-[64px] rounded-sm"
          src={currentPlay.thumbnail}
          alt={currentPlay.alias}
        />
        <div className="px-3 w-2/3">
          <p className="text-[600] text-white truncate">{currentPlay.title}</p>
          <p className="text-sm text-gray-400 truncate">
            {currentPlay.artistsNames}
          </p>
        </div>
        {/* icon heart */}
        <div className="flex items-center justify-center"
          onClick={handleAddWishList}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="w-6/12 flex-col flex items-center justify-center">
        <AudioPlayer
          url={url}
          ref={audioRef}
          handleTimeUpdate={handleTimeUpdate}
          handleEnded={handleEnded}
        />

        <div className="flex items-center justify-center gap-5">
          <button>
            <FontAwesomeIcon
              className={`hover:scale-110 ${shuffle ? "text-red-600" : ""}`}
              icon={faShuffle}
              size={"lg"}
              onClick={handleShuffle}
            />
          </button>
          <button>
            <FontAwesomeIcon
              className="hover:scale-110"
              icon={faBackwardStep}
              size="lg"
              onClick={handlePrevious}
            />
          </button>
          <button onClick={handlePlay}>
            {!isPlaying && (
              <FontAwesomeIcon
                className="hover:scale-110"
                icon={faPlayCircle}
                size="2xl"
              />
            )}
            {isPlaying && (
              <FontAwesomeIcon
                className="hover:scale-110"
                icon={faCirclePause}
                size="2xl"
              />
            )}
          </button>
          <button>
            <FontAwesomeIcon
              className="hover:scale-110"
              icon={faForwardStep}
              size="lg"
              onClick={handleNext}
            />
          </button>
          <button>
            <FontAwesomeIcon
              className={`hover:scale-110 ${loop ? "text-red-600" : ""}`}
              icon={faRepeat}
              size="lg"
              onClick={handleLoop}
            />
          </button>
          
        </div>
        <div className="flex w-full items-start justify-center">
          <p className="w-1/12 text-gray-400 text-center">
            {convertDuration(Math.floor(currentTime))}
          </p>
          {/* <div className="w-10/12 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-2.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
              style={{
                width: `${(currentTime / currentPlay?.duration) * 100}%`,
              }}
            ></div>
          </div> */}
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={(currentTime / currentPlay?.duration) * 100 || 0}
            className="w-10/12 h-1 mt-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
            onChange={(e) => {
                const time = (+e.target.value / 100) * currentPlay?.duration
                setCurrentTime(time)
                if(audioRef.current){
                  audioRef.current.currentTime = time
                }
              }}
          ></input>
          <p className="w-1/12 text-white text-center">
            {convertDuration(currentPlay?.duration)}
          </p>
        </div>
      </div>

      <div className="w-3/12 flex justify-center items-center gap-5">
        <button>
          <FontAwesomeIcon
            icon={faVolumeHigh}
            size={"lg"}
            className="hover:scale-110 hover:text-indigo-700"
            onClick={() =>
              setVolume(
                audioRef.current?.volume && audioRef.current?.volume < 0.9
                  ? audioRef.current?.volume + 0.1
                  : 0.1
              )
            }
          />
        </button>
        <button>
          <FontAwesomeIcon
            icon={faVolumeDown}
            size={"lg"}
            className="hover:scale-110 hover:text-indigo-700"
            onClick={() =>
              setVolume(
                audioRef.current?.volume && audioRef.current?.volume > 0.1
                  ? audioRef.current?.volume - 0.1
                  : 0
              )
            }
          />
        </button>
        <button>
          <FontAwesomeIcon
            icon={faVolumeMute}
            size={"lg"}
            className={`hover:scale-110 hover:text-indigo-700 ${
              audioRef.current?.volume === 0 ? "text-red-500" : ""
            }`}
            onClick={() => setVolume(0)}
          />
        </button>
      </div>
    </div>
  );
}
