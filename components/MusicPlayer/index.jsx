"use client";

import React, { useState, useEffect } from "react";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import VolumeBar from "./VolumeBar";

import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound";
import MediaItem from "../MediaItem";
import LikeButton from "../LikeButton";

const MusicPlayer = ({song, songUrl, key}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [songDuration, setSongDuration] = useState()
  const player = usePlayer();


  const [play, { pause, sound, duration }] = useSound(songUrl, {
    // duration: duration,
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  
  });

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const handleNextSong = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };

  const handlePrevSong = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];
    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(previousSong);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full w-full relative sm:px-12 px-8  items-center justify-between">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isPlaying}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={songUrl}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={songDuration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={songUrl}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={song.currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setSongDuration(event.target.duration)}
        />
      </div>
      <VolumeBar
        value={volume}
        min="0"
        max="1"
        onChange={(event) => setVolume(event.target.value)}
        setVolume={setVolume}
      />
    </div>
  );
};

export default MusicPlayer;
