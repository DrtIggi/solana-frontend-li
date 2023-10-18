import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram,
    faDiscord
  } from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow() {
  return (
    <div className="footer">
      <h3>&copy; 2023 KAKA APP</h3>
      <a href="https://www.youtube.com/c/jamesqquick"
        className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a href="https://www.youtube.com/c/jamesqquick"
        className="discord social">
        <FontAwesomeIcon icon={faDiscord} size="2x" />
      </a>
    </div>
  );
}
