import { GetStaticProps } from "next";
import Head from "next/head";
import axios from 'axios';
import { IRank, ISong, ZingMp3Response } from '../types/ZingMP3Response.type';
import Link from "next/link";
import { convertDuration } from "@/utils/time";
import { useAppDispatch } from "@/redux/hooks";
import { setListSong, setPlay, setPlayMusic } from "@/features/playMusicSlice";

interface IProps{
    data: ZingMp3Response
}
export default function BXH({data}: IProps) {
    const newReleaseChart:IRank  = data.data
    const dispatch = useAppDispatch();
    const handlePlay = (item: ISong) => {
        dispatch(setPlay(item));
        dispatch(setPlayMusic(true));
        dispatch(setListSong(newReleaseChart.items))
      };
    return (
        <>
            <Head>
                <title>BXH Nhạc mới</title>
            </Head>
            <img className="w-full rounded-lg object-cover" src={newReleaseChart.banner}/>
            <h1 className="text-3xl mt-5 font-bold">{newReleaseChart.title}</h1>
            <div className="flex-col justify-center items-center">
                <div className="mt-5">
                    {newReleaseChart.items.map((item: ISong,index: number) => {
                        return (
                            item.streamingStatus === 1 && (
                                <div
                                  key={item.encodeId}
                                  className="pb-3 sm:py-4 cursor-pointer "
                                  onClick={() => {
                                    handlePlay(item);
                                  }}
                                >
                                  <div className="flex items-center space-x-4">
                                    <span className="flex-shrink-0 text-xl font-bold shadow-xl">{index+1}</span>
                                    <div className="flex-shrink-0">
                                      <img
                                        className="w-8 h-8 rounded-full"
                                        src={item.thumbnailM}
                                        alt={item.title}
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {item.title}
                                      </p>
                                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {item.artistsNames}
                                      </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                      {convertDuration(item.duration)}
                                    </div>
                                  </div>
                                </div>
                              )
                        );
                    })}
                </div>
            </div>
        </>
    )
}
export const getStaticProps: GetStaticProps = async () => {
    const res = await axios('http://localhost:3000/api/new-release-chart')
    const data: ZingMp3Response = await res.data
    return {
        props: {data},
    }
}