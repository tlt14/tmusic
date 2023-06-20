import * as React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { ICategory, ISearchResult, ISong, ZingMp3Response } from "../types/ZingMP3Response.type";
import Category from "../components/Category";
import { useAppDispatch } from "@/redux/hooks";
import { setListSong, setPlay, setPlayMusic } from "@/features/playMusicSlice";

export interface IAppProps {
    data:ZingMp3Response
}

export default function SearchAll({data}: IAppProps) {
    
    const searchRes:ISearchResult = data.data
    const playListResult:ICategory = {
        title: "Albums/PlayList",
        sectionType: "",
        viewType: "",
        items: searchRes.playlists,
        link: "",
        itemType: "",
        options: {
            hideTitle: false
        },
        sectionId: ""
    }
    const dispatch = useAppDispatch();
    const handleClick = (item:ISong) => {
        dispatch(setPlay(item));
        dispatch(setPlayMusic(true));
        data && dispatch(setListSong(searchRes.songs))
      }
  return (
    <div>
      <div className=" pb-4 border-b border-gray-500  ">
        <h1 className="text-2xl font-bold">Kết quả tìm kiếm</h1>
      </div>
      <div className="py-4">
        <h1 className="text-2xl font-bold">Bài hát</h1>
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 ">
          {searchRes &&
            searchRes.songs?.map(
              (item: ISong) =>
                item.streamingStatus === 1 && (
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
            )}
        </div>
      </div>
      <Category category={playListResult} />
      
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const q = context.query.q
    const res = await axios.get(`http://localhost:3000/api/search/${q}`)
    console.log(res.data);
    const data = res.data
  return {
    props: {
        data
    },
  };
}