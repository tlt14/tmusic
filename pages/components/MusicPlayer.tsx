import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faBackwardStep, faCirclePause, faForwardStep, faRepeat, faShuffle, faVolumeDown, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ISong, IURLSong, ZingMp3Response } from '../types/ZingMP3Response.type';
import { setPlayMusic } from '@/features/playMusicSlice';
import AudioPlayer from './AudioPlayer';
import { GetStaticProps } from 'next';
import { getStaticProps } from '..';
import axios from 'axios';
export default function MusicPlayer() {
    const {currentPlay,isPlaying} = useAppSelector((state) => state.playMusic)
    const [url,setUrl] = useState<IURLSong>()
    useEffect(()=>{
        async function getSong(){
            try{
                const {data}:ZingMp3Response = await axios.get(`/api/song/${currentPlay.encodeId}`);
                setUrl(data.data)
            }catch(e){
                console.log(e)
            }
        }
        getSong()
        return ()=>{
            setUrl(undefined)
        }
    },[currentPlay])

    return (
        <div className="min-w-full fixed bottom-0 z-50 flex items-center justify-between max-h-[12rem] bg-[#130C1C] px-5 min-h-[84px]">
            <div className="w-3/12 py-3 flex items-center">
                <img
                    className="max-w-[64px] rounded-sm"
                    src={currentPlay.thumbnail} alt={currentPlay.alias}/>
                <div className="px-3 w-2/3">
                    <p className="text-[600] text-white truncate">{currentPlay.title}</p>
                    <p className="text-sm text-gray-400 truncate">{currentPlay.artistsNames}</p>
                </div>
                {/* icon heart */}
                <div className="flex items-center justify-center">
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
            <AudioPlayer url={url}/>
            <div className="w-3/12 flex justify-center items-center gap-5">
                <button>
                    <FontAwesomeIcon icon={faVolumeHigh} size={'lg'} className='hover:scale-110 hover:text-indigo-700'  />
                </button>
                <button>
                    <FontAwesomeIcon icon={faVolumeDown} size={'lg'} className='hover:scale-110 hover:text-indigo-700' />
                </button>
                <button>
                    <FontAwesomeIcon icon={faVolumeMute} size={'lg'} className='hover:scale-110 hover:text-indigo-700' />
                </button>
            </div>
        </div>
    );
}
