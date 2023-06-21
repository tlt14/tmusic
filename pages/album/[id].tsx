import { GetServerSideProps } from "next";
import {
  ISong,
  PlaylistResponse,
  ZingMp3Response,
} from "../../src/types/ZingMP3Response.type";
import { convertDuration } from "@/src/utils/time";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useEffect } from "react";
import { setPlayList } from "@/src/features/playListSlice";
import { setListSong, setPlay, setPlayMusic } from "@/src/features/playMusicSlice";
import Head from "next/head";
import { getAlbum } from "@/src/service/zingmp3.service";

interface IProps {
  playListResponse: ZingMp3Response;
}
export default function Detail({ playListResponse }: IProps) {
  const data: PlaylistResponse = playListResponse?.data;
  const { data: playList } = useAppSelector((state) => state.playList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPlayList(data));
  }, [data,dispatch]);
  const handlePlay = (item: ISong) => {
    dispatch(setPlay(item));
    dispatch(setPlayMusic(true));
    dispatch(setListSong(playList.song.items))
  };
  return (
    <>
    <Head>
      <title>{data?.aliasTitle}</title>
      <meta name="description" content={data?.description} />
    </Head>
    <div className="grid grid-cols-4 gap-x-4 ">
      <div className="flex items-start  justify-center rounded h-auto  bg-transparent max-h-[calc(100vh-200px)]">
        <div className="max-w-sm bg-transparent   rounded-lg shadow ">
          <a href="#_">
            <img
              className="w-full object-cover rounded-lg "
              src={data?.thumbnailM}
              alt={data?.title}
            />
          </a>
          <div className="p-5">
            <a href="#_">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data?.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {data?.sortDescription}
            </p>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Phát ngẫu nhiên
            </button>
          </div>
        </div>
      </div>
      <div className="flex-col justify-start rounded  h-auto dark:bg-transparent col-span-3 min-h-screen overflow-y-auto ">
        <p className="text-lg px-5 pt-2 text-gray-500">
          Lời tựa{" "}
          <span className="text-sm text-white">{data.sortDescription}</span>
        </p>
        <ul className="w-full px-5 divide-y divide-gray-200 dark:divide-gray-700 relative">
          {data &&
            data?.song?.items.map((item) => {
              return (
                item.streamingStatus === 1 && (
                  <li
                    key={item.encodeId}
                    className="pb-3 sm:py-4 cursor-pointer "
                    onClick={() => {
                      handlePlay(item);
                    }}
                  >
                    <div className="flex items-center space-x-4">
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
                  </li>
                )
              );
            })}
        </ul>
      </div>
    </div>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const encodeId = params?.id as string;
//   const res = await fetch("http://localhost:3000/api/album/" + encodeId);
//   const data: ZingMp3Response = await res.json();
//   return {
//     props: {
//       playListResponse: data,
//     },
//   };
// };
export const getServerSideProps: GetServerSideProps = async ({ params ,req}) => {
  const encodeId = params?.id as string;
  const data: ZingMp3Response = await getAlbum(encodeId);
  return {
    props: {
      playListResponse: data,
    },
  };
};
// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: true,
//   };
// };
