"use client"
import React, { useContext, useEffect } from "react";
import { INewRealease, ISong } from "../../src/types/ZingMP3Response.type";
import { useAppDispatch } from "@/redux/hooks";
import { setListSong, setPlay, setPlayMusic } from "@/src/features/playMusicSlice";

interface IProps {
  newRelease: INewRealease;
}
function NewRelease({newRelease}:IProps) {
  const TABS = [
    {
      name: "Tất cả",
      key: "all",
    },
    {
      name: "Việt Nam",
      key: "vPop",
    },
    {
      name: "Quốc tế",
      key: "others",
    },
  ];
  const tabNoActive =
    "inline-block p-4 border-b-2 border-transparent rounded-t-lg dark:text-white hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ";
  const tabActive = "inline-block p-4 border-b-2 rounded-t-lg  text-sm";
  const [data, setData] = React.useState<ISong[]>();
  const [tab, setTab] = React.useState<string>("all");
  useEffect(() => {
    setData(tab === 'all' ? newRelease.items.all : tab === 'vPop' ? newRelease.items.vPop : newRelease.items.others);
  },[tab])
  const dispatch = useAppDispatch();
  const handleClick = (item:ISong) => {
    dispatch(setPlay(item));
    dispatch(setPlayMusic(true));
    data && dispatch(setListSong(data))
  }
  return (
    <>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-nowrap items-center justify-start -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          {TABS.map((item) => (
            <li className="mr-2" role="presentation" key={item.key}>
              <button
                className={item.key === tab ? tabActive : tabNoActive}
                id="profile-tab"
                data-tabs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                onClick={() => setTab(item.key)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 h-96 overflow-y-auto">
        {data 
          && 
          data?.map(
            (item) =>
              item.streamingStatus === 1 && (
                <div className="col-span-1" key={item?.encodeId}>
                  <div
                    className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
                    onClick={()=>handleClick(item)}
                  >
                    <div className="w-3/12 bg-gray-200 rounded-lg ">
                      <img
                        src={item?.thumbnail}
                        alt={item?.title}
                        className="w-full h-full object-center object-cover group-hover:opacity-75 rounded"
                      />
                    </div>
                    <div className="ml-4 w-9/12 flex flex-col justify-start">
                      <h3 className="text-sm font-bold text-gray-700 dark:text-white ">
                        <span aria-hidden="true" className="" />
                        {item?.title}
                      </h3>
                      <p className=" text-xs text-gray-500 dark:text-gray-400 ">
                        {item?.artistsNames}
                      </p>
                    </div>
                  </div>
                </div>
              )
          )}
      </div>
    </>
  );
}

export default NewRelease;
