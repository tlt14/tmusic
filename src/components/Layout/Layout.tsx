"use client";
import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import MusicPlayer from "../MusicPlayer";


export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isShow,setIshow] = useState(false) 
  return (
    
        <div>
          <Navbar setIsShow={setIshow} isShow={isShow}/>
          <Sidebar isShow={isShow} />
          <main className="p-4 sm:ml-56 dark:bg-[#170F23] min-h-screen ">
            <div className="p-6 rounded-lg mt-14 mb-[100px]">
              {children}
            </div>
          </main>
          <MusicPlayer/>
        </div>
  );
}
