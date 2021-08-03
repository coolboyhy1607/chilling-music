const plausible = {
  track: (value, props) => {
    // console.log("track Plausible:", value, props);
    if (typeof window !== "undefined") {
      window.plausible &&
        window.plausible(value, {
          props: props,
        });
    }
  },
};

export default plausible;
