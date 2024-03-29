import { atom, DefaultValue, selector } from "recoil";
import { getRandomIndex } from "./components/Player";
import gifs from "./gifs";
import staticGifs from "./staticGifs";
import stations from "./stations";
import danceMovie from "./danceMovie";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

/* --------------------------------- Player --------------------------------- */
export const positionPage=atom({
  key: "positionPage",
  default: "/",
});

export const newStation = selector({
  key: "newStation",
  get: ({ get }) => {
    const currentPage= get(positionPage)
    return stations.filter((station) => station.type === currentPage)
  }
})
export const playerShownState = atom({
  key: "playerShown",
  default: false,
});

export const dancePlayerLoading = atom({
  key: "dancePlayerLoading",
  default: true,
});

export const playerVolumeState = atom({
  key: "playerVolume",
  default: 0.7,
  effects_UNSTABLE: [localStorageEffect("playerVolume")],
});

export const isBufferingState = atom({
  key: "isBuffering",
  default: null,
});

export const currentStationIdState = atom({
  key: "currentStationId",
  default: stations[0].id,
  effects_UNSTABLE: [
    localStorageEffect("currentStationId"),
    // ({onSet}) => {
    //     onSet(newID => {
    //       console.debug("currentStationId:", newID);
    //     });
    // }
  ],
});

export const currentStationState = selector({
  key: "currentStation",
  get: ({ get }) => {
    const currentStationId = get(currentStationIdState);
    const newstation = get(newStation);
    // const currentPosition=get(positionPage);
    const currentStation = newstation.find(
      (station) => station.id === currentStationId
    );
    if (currentStation) {
      return currentStation;
    } else {
      localStorage.removeItem("currentStationId");
      return newstation[0];
    }
  },
  // set: ({get, set}, currentStation) => set(currentStationIdState, currentStation)
});

export const currentStationIndexState = selector({
  key: "currentStationIndex",
  get: ({ get }) => {
    const currentStation = get(currentStationState);
    const newstation = get(newStation);
    return newstation.findIndex((station) => station === currentStation);
  },
});

/* -------------------------------- Features -------------------------------- */

export const pomodoroShownState = atom({
  key: "pomodoroShown",
  default: false,
});

export const aboutShownState = atom({
  key: "aboutShown",
  default: false,
});

export const stationsSelectorOpenState = atom({
  key: "stationsSelectorOpen",
  default: false,
});

/* -------------------------------- Settings -------------------------------- */

export const lowEnergyModeState = atom({
  key: "lowEnergyMode",
  default: false,
  effects_UNSTABLE: [localStorageEffect("lowEnergyMode")],
});

export const embedShownState = atom({
  key: "embedShown",
  default: false,
  effects_UNSTABLE: [localStorageEffect("embedShown")],
});

/* ---------------------------------- GIFs ---------------------------------- */

export const currentGifIndexState = atom({
  key: "currentGifIndex",
  default: 0,
  effects_UNSTABLE: [localStorageEffect("currentGifIndex")],
});
export const nextGifIndexState = atom({
  key: "nextGifIndex",
  default: getRandomIndex(gifs),
});
export const staticShownState = atom({
  key: "staticShown",
  default: false,
});
export const staticIndexState = atom({
  key: "staticIndex",
  default: getRandomIndex(staticGifs),
});
/* ---------------------------------- Dance Movie ---------------------------------- */
export const currentDanceIndexState = atom({
  key: "currentDanceIndex",
  default: 0,
  effects_UNSTABLE: [localStorageEffect("currentDanceIndex")],
});
export const nextDanceIndexState = atom({
  key: "nextDanceIndex",
  default: getRandomIndex(danceMovie),
});
