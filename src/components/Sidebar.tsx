"use client";

import { auth, handleLogin } from "@/firebase";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

interface IPropsType {
    
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>
}
export default function Sidebar({isShow, setIsShow}: IPropsType) {
  const router =useRouter();
  const handleClick =()=>{
    if(auth.currentUser && auth.currentUser?.uid) {
      router.push("/mymusic")
    }else{
      handleLogin()
    }
  }
  return (
    <aside
        className={`fixed z-50 w-[238px] h-screen overflow-hidden  transition-transform  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-[#170f23] dark:border-gray-700 
        ${ !isShow  && '-translate-x-full' }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto ">
          <ul className="space-y-2 font-medium">
            <li className="h-[70px] flex items-center">
                <img className="px-[28px] w-[calc(100%-28px)]" src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg" alt={""}></img>
              <span className="text-2xl cursor-pointer mr-3 sm:hidden block" onClick={()=>{setIsShow(false)}}>x</span>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className="ml-3">Khám phá</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className="ml-3">#zingchart</span>
              </Link>
            </li>
            <li>
              {/* <Link
                href="#"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Radio</span>
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Live
                </span>
              </Link> */}
            </li>
            <li>
              <button
                className=" w-full flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleClick}
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className="ml-3">Thư viện</span>
              </button>
            </li>
            <li>
                <div className="w-full h-0.5 bg-gray-500 rounded"></div>
            </li>
            <li>
              <Link
                href="/moi-phat-hanh"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className="ml-3">BXH Nhạc mới</span>
              </Link>
            </li>
            {/* <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className="ml-3">Chủ Đề & Thể Loại</span>
              </Link>
            </li> */}
            <li>
              <Link
                href="/top100"
                className="flex items-center p-2 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className="ml-3">Top 100</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
  );
}
