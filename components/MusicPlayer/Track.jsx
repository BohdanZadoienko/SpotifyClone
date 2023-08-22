"use client";

import React from 'react';
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";

const Track = ({ isPlaying, isActive, activeSong }) => {
  const imageUrl = useLoadImage(activeSong);

  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <Image src={imageUrl} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong.author ? activeSong?.author : 'No active Song'}
      </p>
    </div>
  </div>
}

export default Track;
