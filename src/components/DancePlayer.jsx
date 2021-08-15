import { useCallback, useEffect, useState} from "react";
import ReactPlayer from "react-player";
import { useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import danceMovie from "../danceMovie";
import Icon from "./Icon";
import {
  isBufferingState,
  playerVolumeState,
  currentDanceIndexState,
  currentStationIndexState,
  dancePlayerLoading,
  playerShownState,
  stationsSelectorOpenState
} from "../recoilState";
import BlinkingDots from "./BlinkingDots";
function DancePlayer({ isPlaying}) {
  const show = useRecoilValue(playerShownState);
  const stationsSelectorOpen = useRecoilValue(stationsSelectorOpenState);
  const [danceIndex, setDanceIndex]=useRecoilState(currentDanceIndexState);
  const currentStationIndex = useRecoilValue(currentStationIndexState);
  const setReactPlayerLoading = useSetRecoilState(dancePlayerLoading);

  const setIsBuffering = useSetRecoilState(isBufferingState);
  // const [playerVolume, setPlayerVolume] = useRecoilState(playerVolumeState);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  function resetError() {
    setError(null);
    setErrorMsg("");
  }

  const handleShufflePlay = useCallback(() => {
    resetError();
    const randomDanceIndex = getRandomIndex(danceMovie, danceIndex);
    setDanceIndex(randomDanceIndex);
    // eslint-disable-next-line
  }, [currentStationIndex]);

  /* ------------------------------ Handle Error ------------------------------ */

  useEffect(() => {
    if (error === 150) {
      setErrorMsg("Ops, this video is not working. Skipping it");
      const timeout = setTimeout(() => {
        resetError();
        handleShufflePlay();
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [error, handleShufflePlay]);

  return (
    <>
      {/* <div style={{ ...containerInnerStyle, display: show ? "block" : "none" }}>
          {!stationsSelectorOpen && errorMsg && (
            <span className="red">
              {errorMsg}
              <BlinkingDots />
            </span>
          )}
      </div> */}
      <div
        style={wrapperStyle}
        className="yt-wrapper"
      >
        <a
          onClick={(e) => {
            e.stopPropagation();
          }}
          href={`https://www.youtube.com/watch?v=${danceMovie[danceIndex]}`}
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
            url={"https://www.youtube.com/watch?v=" + danceMovie[danceIndex]}
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
            onReady={() => setReactPlayerLoading(false)}
            onError={(err) => setError(err)}
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
