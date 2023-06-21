"use client"
import React from "react";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import { IBanner, ISong } from "../../src/types/ZingMP3Response.type";
import { useAppDispatch } from "../redux/hooks";
import { setPlay, setPlayMusic } from "../features/playMusicSlice";
import axios from "axios";
interface IProps {
  banner: IBanner;
}
function Banner({banner}: IProps) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const responsiveSettings = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];
  const dispatch = useAppDispatch();
    const handleClick = async(item:ISong) => {
        const res =await axios.get('https://zingmp3-api.onrender.com/api/infosong?id='+item.encodeId)
        dispatch(setPlay(res.data.data as ISong));
        dispatch(setPlayMusic(true));
      }
  return (
    <Slider {...settings} responsive={responsiveSettings}>
      {banner &&
        banner?.items?.length > 0 &&
        banner?.items?.map((item: any) => {
          return (
            <div
              key={item.encodeId}
              className={`flex items-center justify-center h-auto rounded bg-gray-50 dark:bg-transparent p-4`}
            >
              <div
                className="text-2xl text-gray-400 dark:text-gray-500"
                onClick={() => {
                  handleClick(item);
                }}
              >
                <img
                  className="h-auto transition-all duration-300 rounded-lg cursor-pointer hover:opacity-75 object-cover max-h-[210px] w-full"
                  src={item.banner}
                  alt="image_description"
                />
              </div>
            </div>
          );
        })}
    </Slider>
  );
}

export default Banner;
