import { useRecoilValue } from "recoil";
import { currentStationState, positionPage } from "../recoilState";
import createTwitterLink from "../utils/createTwitterLink";
import plausible from "../utils/plausible";

export default function useTweetStation() {
  const currentPosition=useRecoilValue(positionPage);
  const currentStation = useRecoilValue(currentStationState);
  function tweetStation() {
    if (currentStation) {
      plausible.track("Tweet Station", {
        stationName: currentStation.name,
        stationId: currentStation.id,
      });
      window.open(
        createTwitterLink({
          text: `Chilling with 🎧 ${currentStation.name}`,
          url: `https://chilling.bar${currentPosition}?station=${currentStation.id}`,
        })
      );
    }
  }
  return tweetStation;
}
