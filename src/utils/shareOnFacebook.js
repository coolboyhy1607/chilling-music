import plausible from "./plausible";

export default function shareOnFacebook() {
  plausible.track("Share on Facebook");
  window.open(`https://www.facebook.com/sharer/sharer.php?u=https://lofi.cafe`);
}
