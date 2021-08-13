import React, { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useRecoilState, useSetRecoilState } from "recoil";
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
  positionPage
} from "../recoilState";
import sounds from "../sounds";
import strings from "../strings";
import detectFullscreenAvailable from "../utils/detectFullscreenAvailable";
import plausible from "../utils/plausible";
import About from "./About";
import GifBackground, { useChangeGif, useShowStatic } from "./GifBackground";
import Player from "./Player";
import PlayPauseArea from "./PlayPauseArea";
import PomodoroTimer from "./PomodoroTimer";
import PressToStart from "./PressToStart";
import RoomActions from "./RoomActions";
import VisitorsCounter from "./VisitorsCounter";
import {Link} from "react-router-dom";

function Club() {
  const [playerShown, setPlayerShown] = useRecoilState(playerShownState);
  const [lowEnergyMode, setLowEnergyMode] = useRecoilState(lowEnergyModeState);
  const setPositionPage = useSetRecoilState(positionPage);
  const [isPlaying, setIsPlaying] = useState(false);
  const setPomodoroShown = useSetRecoilState(pomodoroShownState);
  const setAboutShown = useSetRecoilState(aboutShownState);

  const location=useLocation();
  setPositionPage(location.pathname);

  const showStatic = useShowStatic();
  const changeGif = useChangeGif();
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
    changeGif();
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
    ["g", changeGif],
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
        {playerShown && (
          <PlayPauseArea isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        )}
        <GifBackground />
        <div id="crt-lines" />
        <div id="darken" />
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

        {!playerShown && <PressToStart />}
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onStationChanged={handleStationChanged}
        />
      </div>
      <Link to="/" className="red goBackToBar" onClick={setPositionPage("/")}>← Go back to bar</Link>
    </FullScreen>
  );
}

export function detectTouch() {
  return "ontouchend" in document;
}

export default Club;
