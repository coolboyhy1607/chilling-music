import { useEffect } from "react";
import { useSetRecoilState,useRecoilValue } from "recoil";
import { currentStationIdState,newStation } from "../recoilState";
import getStationFromUrl from "../utils/getStationFromUrl";

export default function useStationFromUrl(type) {
  const setCurrentStationId = useSetRecoilState(currentStationIdState);
  const stations=useRecoilValue(newStation);

  useEffect(() => {
    const stationFromUrl = getStationFromUrl(type);
    if (stations.find((s) => s.id === stationFromUrl)) {
      setCurrentStationId(stationFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
