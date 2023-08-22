"use client";

import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-75 ">
    {/* <BsArrowRepeat size={20} color={repeat ? 'white' : ''} onClick={() => setRepeat((prev) => !prev)} className="hidden sm:block cursor-pointer text-neutral-400 hover:text-white transition" /> */}

    {currentSongs?.length && (
      <MdSkipPrevious
        size={30}
        className="text-neutral-400 cursor-pointer hover:text-white transition hidden sm:block"
        onClick={handlePrevSong}
      />
    )}

    {isPlaying ? (
      <BsFillPauseFill
        size={45}
        color="#FFF"
        onClick={handlePlayPause}
        className="cursor-pointer"
      />
    ) : (
      <BsFillPlayFill
        size={45}
        color="#FFF"
        onClick={handlePlayPause}
        className="cursor-pointer"
      />
    )}
    {currentSongs?.length && (
      <MdSkipNext
        size={30}
        className="text-neutral-400 cursor-pointer hover:text-white transition hidden sm:block"
        onClick={handleNextSong}
      />
    )}
    {/* <BsShuffle size={20} color={shuffle ? 'white' : ''} onClick={() => setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer text-neutral-400 hover:text-white transition" /> */}
  </div>
);

export default Controls;
