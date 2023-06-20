import React, { useEffect, useRef, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setPlayMusic } from "@/features/playMusicSlice";
import { convertDuration } from "@/utils/time";
import { IURLSong } from "../types/ZingMP3Response.type";
interface IProps {
  url: IURLSong | undefined;
  handleTimeUpdate: () => void;
  handleEnded: () => void;
}
import { forwardRef } from "react";
const AudioPlayer = ({ url, handleTimeUpdate,handleEnded }: IProps, ref: any) => {
  return (
    <audio ref={ref} src={url && url[128]} onTimeUpdate={handleTimeUpdate} 
        onEnded={handleEnded}
    />
  );
};

export default forwardRef(AudioPlayer);
