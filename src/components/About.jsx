import { useRecoilValue } from "recoil";
import QuyenImage from "../images/avatars/quyen.png";
import { aboutShownState } from "../recoilState";
import strings from "../strings";
import Button from "./Button";
import FadeInDiv from "./FadeInDiv";
import Icon from "./Icon";
import { useState, useEffect } from 'react';

function About() {
  const aboutShown = useRecoilValue(aboutShownState);

  return (
    <FadeInDiv show={aboutShown} className="about-container">
      <TeamMembers />
      <span style={{ marginBottom: "4px" }}>
        <span className="red">{strings.arrows}</span> {strings.changeStation}
      </span>
      <span style={{ marginBottom: "16px" }}>
        <span className="red">{strings.spacebar}</span> {strings.playPause}
      </span>
      <span style={{ marginBottom: "4px" }}>
        <span className="red">T</span> {strings.tweetThisStation}
      </span>
      <span style={{ marginBottom: "4px" }}>
        <span className="red">G</span> {strings.changeGif}
      </span>
      <span style={{ marginBottom: "12px" }}>
        <span className="red">V</span> {strings.showVideo}
      </span>
      <span style={{ marginBottom: "4px" }}>
        <span className="red">L</span> {strings.lowPowerMode}
      </span>
      <span style={{ marginBottom: "12px" }}>
        <span className="red">ESC</span> {strings.closeThis}
      </span>
      <NewsletterForm />
      <a href="mailto:hey@chilling.bar">
        <Button text={strings.sayHi} />
      </a>
      <span style={{ marginBottom: "12px" }} />
      <a target="_blank" href="https://www.buymeacoffee.com/congquyen">
        <span>Buy me a beer </span><span>🍺</span>
      </a>
    </FadeInDiv>
  );
}

const TeamMembers = () => {
  return (
    <span style={{ display: "flex", marginBottom: "10px" }}>
      <TeamMember name="Cong Quyen" username="quyen.cong" image={QuyenImage} />
    </span>
  );
};

const TeamMember = ({ name, username, image }) => {
  return (
    <a
      href={`https://www.facebook.com/` + username}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginLeft: "16px",
      }}
      className="team-member pointer"
    >
      <img
        style={{
          width: "80px",
          height: "80px",
          marginBottom: "3px",
        }}
        src={image}
        alt={name}
        className="green-box-small"
      />
      <span
        style={{ display: "block", textDecoration: "none", fontSize: "20px" }}
      >
        @{username}
      </span>
      {/* <span style={{ display: "block", fontSize: "18px" }}>@{username}</span> */}
    </a>
  );
};

const NewsletterForm = () => {
  return (
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/lofi"
      method="post"
      target="popupwindow"
      onSubmit="window.open('https://buttondown.email/lofi', 'popupwindow')"
      className="embeddable-buttondown-form"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        marginBottom: "4px",
      }}
    >
      <span style={{ display: "block", marginBottom: "6px" }}>
        <Icon name="mail" style={{ position: "relative", bottom: "-3px" }} />{" "}
        {strings.updates}
      </span>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
        }}
      >
        <input
          type="email"
          className="green-box-small"
          placeholder="your@amazing.email"
          name="email"
          id="bd-email"
          style={{ width: "188px" }}
        />
        <input type="hidden" value="1" name="embed" />
        <button
          text="Subscribe"
          type="submit"
          value="Subscribe"
          style={{ flex: 0 }}
        >
          <Icon name="checkmark" style={{ marginLeft: "5px" }} />
        </button>
      </div>
    </form>
  );
};

export default About;
