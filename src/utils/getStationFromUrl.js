import queryString from "query-string";
// import stations from "../stations";
export default function getStationFromUrl(type) {
  
    // eslint-disable-next-line no-restricted-globals
  const { station: urlStation } = queryString.parse(location.search);
  return urlStation;
}
