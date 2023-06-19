import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faBackwardStep, faCirclePause, faForwardStep, faRepeat, faShuffle, faVolumeDown, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setPlayMusic } from '@/features/playMusicSlice';
import { convertDuration } from '@/utils/time';
import { IURLSong } from '../types/ZingMP3Response.type';
interface IProps{
    url: IURLSong | undefined
}
const AudioPlayer= ({url}: IProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const {currentPlay,isPlaying} = useAppSelector((state) => state.playMusic)
    const dispatch = useAppDispatch();
    const [currentTime, setCurrentTime] = useState<number>(0);
    const handlePlay =()=>{
        dispatch(setPlayMusic(!isPlaying))
        if(!isPlaying){
            audioRef.current?.play();
        }else{
            audioRef.current?.pause();
        }
    }
    const setVolume = (volume: number) => {
        if (audioRef.current) {
          audioRef.current.volume = volume;
        }
      };
    
    
    const handleTimeUpdate =()=>{
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    }
    useEffect(()=>{
        if(isPlaying){
            audioRef.current?.play();
        }
    },[isPlaying,audioRef.current,url,currentPlay])
    
  return (
    <div className="w-6/12 flex-col flex items-center justify-center">
        <audio ref={audioRef} 
            src={url && url[128]}
            onTimeUpdate={handleTimeUpdate}
            />
        <div className='flex items-center justify-center gap-5'>
            <button>
                <FontAwesomeIcon className='hover:scale-110' icon={faShuffle} size={'lg'} />
            </button>
            <button>
                <FontAwesomeIcon className='hover:scale-110' icon={faBackwardStep} size='lg' />
            </button>
            <button onClick={handlePlay}>
                {
                    !isPlaying &&
                    <FontAwesomeIcon className='hover:scale-110' icon={faPlayCircle} size='2xl' />
                }
                {
                    isPlaying &&
                    <FontAwesomeIcon className='hover:scale-110' icon={faCirclePause} size='2xl' />
                }
            </button>
            <button>
            <FontAwesomeIcon className='hover:scale-110' icon={faForwardStep} size='lg' />
            </button>
            <button>
            <FontAwesomeIcon className='hover:scale-110' icon={faRepeat} size='lg' />
            </button>
        </div>
        <div className="flex w-full items-start justify-center">
            <p className="w-1/12 text-gray-400 text-center">{convertDuration(Math.floor(currentTime))}</p>
                <div className="w-10/12 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-2.5">
                    <div className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" style={{width: `${(currentTime / currentPlay?.duration) * 100}%`}}></div>
                </div>
            <p className="w-1/12 text-white text-center">{convertDuration(currentPlay?.duration)}</p>
        </div>
    </div>
  );
};

export default AudioPlayer;
