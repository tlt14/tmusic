import { useEffect, useState } from "react";
import { ISong } from "../../src/types/ZingMP3Response.type";
import { auth, getWishList } from "@/firebase";
import { useAppDispatch } from "@/src/redux/hooks";
import { setListSong, setPlay, setPlayMusic } from "@/src/features/playMusicSlice";
import { data } from "autoprefixer";
import Head from "next/head";

interface MyMusic{
    song:ISong;
    createdAt:string;
}
export default function MyMusic() {
    const [list,setList] = useState<MyMusic[]>([])
    useEffect(()=>{
        async function exampleUsage() {
            try {
              while (true) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                break;
              }
              const wishlistItems = await getWishList();
              setList(wishlistItems); 
            } catch (error) {
              console.error(error);
            }
          }
          exampleUsage()
    },[auth])
    const dispatch = useAppDispatch();
    const handleClick = (item:ISong) => {
        dispatch(setPlay(item));
        dispatch(setPlayMusic(true));
        const songsArray = list.map(item => item.song);
        data && dispatch(setListSong(songsArray))
      }
    return <div>
        <Head>
          <title>Nhạc cá nhân</title>
        </Head>
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 ">
          {list &&
            list.map(
              (data: MyMusic) =>{
                const item = data.song;
                return item.streamingStatus === 1 && (
                    <div className="col-span-1" key={item.encodeId}>
                      <div
                        className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
                        onClick={() => handleClick(item)}
                      >
                        <div className="w-2/12 bg-gray-200 rounded-lg ">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-center object-cover group-hover:opacity-75 rounded"
                          />
                        </div>
                        <div className="ml-4 w-10/12 flex flex-col justify-start">
                          <h3 className="text-sm font-bold text-gray-700 dark:text-white ">
                            <span aria-hidden="true" className="" />
                            {item.title}
                          </h3>
                          <p className=" text-xs text-gray-500 dark:text-gray-400 ">
                            {item.artistsNames}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
              }
            )}
        </div>
    </div>;
}