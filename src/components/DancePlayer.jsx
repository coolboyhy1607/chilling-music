import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useRecoilState, useRecoilValue} from "recoil";
import useIsIOS from "../hooks/useIsIOS";
import danceMovie from "../danceMovie";
import {
  embedShownState,
  isBufferingState,
  playerShownState,
  playerVolumeState,
  stationsSelectorOpenState,
  positionPage,
  newStation,
  currentDanceIndexState
} from "../recoilState";
// import stations from "../stations";
import plausible from "../utils/plausible";
// import BlinkingDots from "./BlinkingDots";
// import Button from "./Button";
// import Selector from "./Selector";
import Spacer from "./Spacer";
import VolumeSlider from "./VolumeSlider";

function DancePlayer({isPlaying}) {
  const show = useRecoilValue(playerShownState);

  const [stationsSelectorOpen, setStationsSelectorOpen] = useRecoilState(
    stationsSelectorOpenState
  );
  const [danceIndex, setDanceIndex]=useRecoilState(currentDanceIndexState)
//   const stations= useRecoilValue(newStation);
//   const [currentStationId, setCurrentStationId] = useRecoilState(currentStationIdState);
//   const currentStation = useRecoilValue(currentStationState);
//   const currentStationIndex = useRecoilValue(currentStationIndexState);
  // const currentPage = useRecoilValue(positionPage);

  const [reactPlayerLoading, setReactPlayerLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useRecoilState(isBufferingState);
  const [longBuffering, setLongBuffering] = useState(null);
  const [playerVolume, setPlayerVolume] = useRecoilState(playerVolumeState);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const playerShown = useRecoilValue(playerShownState);

  const [_embedShown, setEmbedShown] = useRecoilState(embedShownState);
  let embedShown = !error && playerShown && _embedShown;

  const isIOS = useIsIOS();

  function resetError() {
    setError(null);
    setErrorMsg("");
  }

  const handleShufflePlay = useCallback(() => {
    resetError();
    const randomDanceIndex = getRandomIndex(danceMovie, danceIndex);
    setDanceIndex(danceMovie[randomDanceIndex]);
  }, [danceIndex]);

  /* ----------------------------- Handle Loading ----------------------------- */

  useEffect(() => {
    let timeout;
    if (isBuffering) {
      timeout = setTimeout(() => {
        setLongBuffering(true);
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      clearTimeout(timeout);
      setLongBuffering(false);
    }
  }, [isBuffering, currentStation]);

  /* ------------------------------ Handle Error ------------------------------ */

//   useEffect(() => {
//     if (error === 150) {
//       setErrorMsg("Ops, this station is not working. Skipping it");
//       const timeout = setTimeout(() => {
//         resetError();
//         handleShufflePlay();
//       }, 4000);
//       return () => clearTimeout(timeout);
//     }
//   }, [error, handleShufflePlay]);

  return (
    <>
      {/* <div style={{ ...containerInnerStyle, display: show ? "block" : "none" }}>
          {!stationsSelectorOpen && errorMsg && (
            <span className="red">
              {errorMsg}
            </span>
      </div> */}
      <div
        style={wrapperStyle}
        className="yt-wrapper"
      >
        <a
          onClick={(e) => {
            e.stopPropagation();
          }}
          href={`${danceMovie[danceIndex]}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            top: "20%",
            right: 10,
            zIndex :2
          }}
        >
          <Icon name="open" />
        </a>{" "}
        <div style={innerWrapperStyle}>
          <ReactPlayer
            controls={false}
            playing={isPlaying}
            url={danceMovie[danceIndex]}
            style={reactPlayerStyle}
            width="100vw"
            height="200vw"
            volume={0}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: true,
                  color: "black",
                },
              },
            }}
            playsinline={true}
            pip={true}
            onReady={() => setReactPlayerLoading(false)}
            onError={(err) => setError(err)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onBuffer={() => setIsBuffering(true)}
            onBufferEnd={() => setIsBuffering(false)}
            onStart={() => setIsBuffering(false)}
            onEnded={() => handleShufflePlay()}
          />
        </div>
      </div>
    </>
  );
}

export function getRandomIndex(arr, currentIndex) {
  const randomIndex = Math.floor(Math.random() * arr.length);

  return randomIndex === currentIndex
    ? getRandomIndex(arr, currentIndex)
    : randomIndex;
}
export const containerInnerStyle = {
  width: "100%",
  zIndex: 6,
};


const wrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  background: "black",
};

const hiddenStyle = {
  pointerEvents: "none",
  userSelect: "none",
  position: "fixed",
  top: "100%",
  left: "100%",
};

const innerWrapperStyle = {
//   width: "100%",
//   height: "100%",
//   overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
//   borderRadius: "8px",
  position: "absolute",
  width: "100vw",
  height: "100vh",
  top: "0",
  left: "0",
  objectFit: "cover",
  zIndex: 1,
};

const reactPlayerStyle = {
  pointerEvents: "none",
  userSelect: "none",
  zIndex: -1,
  borderRadius: "8px",
};
export default DancePlayer;
