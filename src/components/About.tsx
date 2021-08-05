import { useRecoilValue } from "recoil";
import QuyenImage from "../images/avatars/quyen.png";
import { aboutShownState } from "../recoilState";
import strings from "../strings";
import Button from "./Button";
import FadeInDiv from "./FadeInDiv";
import {useFormSubmission} from "../utils/netlifyForm";
import {FormField} from "../types/types";
import React from "react";

function About() {
  const aboutShown = useRecoilValue(aboutShownState);
  const aboutShown2=aboutShown? "flex" : "none";
  return (
    <FadeInDiv show="false"  style={{display:aboutShown2}} className="about-container">
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
      <span style={{ marginBottom: "16px" }}>
        <span className="red">ESC</span> {strings.closeThis}
      </span>
      <NewsletterForm />
      <a href="mailto:hey@chilling.bar">
        <Button text={strings.sayHi} />
      </a>
      <span style={{ marginBottom: "16px" }} />
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
const formConfig: FormField[] = [
  { initial: "", name: "Name", type: "text", element: "input" },
  { initial: "", name: "Email", type: "email", element: "input" },
  {
    initial: "",
    name: "bot-field",
    type: "hidden",
    element: "input",
    className: "hidden"
  }
]
const NewsletterForm = () => {

  const { formState, fieldsState, submitForm, updateField } = useFormSubmission(
    formConfig
  )
  if (formState === "SUCCESS") {
    return <div>Thanks! We&apos;ll be in touch shortly</div>
  }
  return (
    <form name="contact" onSubmit={submitForm} netlify netlify-honeypot="bot-field">
      {formConfig.map(({ name, element, type, className }) =>
        React.createElement(element, {
          key: name,
          type,
          name,
          value: fieldsState[name],
          onChange: updateField,
          placeholder: name,
          className,
          style: {display:"flex",flexDirection:"columm",margin:"0 0 10px auto"},
        })
      )}
      <input type="hidden" name="form-name" value="contact" />
      <span style={{ marginBottom: "12px" }}>
        <button type="submit">Send</button>
        {formState === "SUBMITTING" && <span style={{display:"flex"}}>Sending...</span>}
        {formState === "ERROR" && <span style={{display:"flex"}}>Oops! Something went wrong!</span>}
      </span>
    </form>
  )
};

export default About;
