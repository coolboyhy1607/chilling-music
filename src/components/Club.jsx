import React, { useState,useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useRecoilState, useSetRecoilState,useRecoilValue } from "recoil";
import useKeysPressed from "../hooks/useKeysPressed";
import useShowAboutFirstTime from "../hooks/useShowAboutFirstTime";
import useStationFromUrl from "../hooks/useStationFromUrl";
import useTweetStation from "../hooks/useTweetStation";
import {useLocation} from "react-router-dom";
import {
  aboutShownState,
  lowEnergyModeState,
  playerShownState,
  pomodoroShownState,
  positionPage,
  currentStationIdState,
  newStation,
  nextDanceIndexState
} from "../recoilState";
import sounds from "../sounds";
import strings from "../strings";
import detectFullscreenAvailable from "../utils/detectFullscreenAvailable";
import plausible from "../utils/plausible";
import About from "./About";
import GifBackground, { useChangeDance, useShowStatic } from "./GifBackground";
import Player from "./Player";
import DancePlayer from "./DancePlayer";
import PlayPauseArea from "./PlayPauseArea";
import PomodoroTimer from "./PomodoroTimer";
import PressToStart from "./PressToStart";
import RoomActions from "./RoomActions";
import VisitorsCounter from "./VisitorsCounter";
import {Link} from "react-router-dom";
import danceMovie from "../danceMovie";
import { getRandomIndex } from "./Player";

function Club() {
  const [playerShown, setPlayerShown] = useRecoilState(playerShownState);
  const [lowEnergyMode, setLowEnergyMode] = useRecoilState(lowEnergyModeState);
  const [currentPage,setCurrentPage] = useRecoilState(positionPage);
  const [isPlaying, setIsPlaying] = useState(false);
  const setPomodoroShown = useSetRecoilState(pomodoroShownState);
  const setAboutShown = useSetRecoilState(aboutShownState);
  const setCurrentStationId = useSetRecoilState(currentStationIdState);
  const [nextDanceIndex,setNextDanceIndex]=useRecoilState(nextDanceIndexState);
  const location=useLocation();
  setCurrentPage(location.pathname);
  
  const stations= useRecoilValue(newStation);
  useEffect(() => {
    setCurrentStationId(stations[0].id);
    if (playerShown) setIsPlaying(true);
    setLowEnergyMode(true);
    const randomDanceIndex = getRandomIndex(danceMovie, nextDanceIndex);
    setNextDanceIndex(randomDanceIndex);
  }, [currentPage]);
  
  const showStatic = useShowStatic();
  const changeDance = useChangeDance();
  const tweetStation = useTweetStation();
  useShowAboutFirstTime(isPlaying);
  useStationFromUrl("club");

  const locale = strings.getLanguage();
  const isJapanese = locale === "ja";

  const fs = useFullScreenHandle();
  const fsAvailable = detectFullscreenAvailable();

  function handleStationChanged(playSound = true) {
    plausible.track("Change Station");
    showStatic(300);
    if (playSound) sounds.static.play();
    changeDance();
  }

  function handleStart() {
    if (!playerShown) {
      setPlayerShown(true);
      setIsPlaying(true);
      // handleStationChanged();
    }
  }
  // strings.setLanguage("vi");
  useKeysPressed([
    [
      "Escape",
      () => {
        setAboutShown(false);
        setPomodoroShown(false);
      },
    ],
    ["t", tweetStation],
    ["l", () => setLowEnergyMode(!lowEnergyMode)],
    ["g", changeDance],
    ["any", handleStart],
  ]);

  return (
    <FullScreen handle={fs}>
      <div
        id="container"
        className={[
          lowEnergyMode ? "low-energy" : "",
          !playerShown ? "pointer" : "",
          isJapanese ? "ja" : "",
        ]
          .join(" ")
          .trim()}
        onClick={handleStart}
      >
        <DancePlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onStationChanged={handleStationChanged}
        />
        {playerShown && (
          <PlayPauseArea isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        )}
        {/* <GifBackground /> */}
        <div id="crt-lines" />
        {/* <div id="darken" /> */}
        <div id="vignette" />
        <div id="top-ui">
          <div>
            <VisitorsCounter />
          </div>
          <div className="vertical">
            {playerShown && (
              <RoomActions fullscreen={fs} fullscreenAvailable={fsAvailable} />
            )}
            <About />
            <PomodoroTimer />
          </div>
        </div>
        <div className="goBackToBar">
        <Link to="/" className="red">← Go back to bar</Link>
        </div>
        {!playerShown && <PressToStart />}
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onStationChanged={handleStationChanged}
        />
      </div>
    </FullScreen>
  );
}
const reactPlayerStyle = {
  pointerEvents: "none",
  userSelect: "none",
  zIndex: -1,
  borderRadius: "8px",
};

export function detectTouch() {
  return "ontouchend" in document;
}

export default Club;
