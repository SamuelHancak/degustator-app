import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SideMenu.css";

export const SideMenu = () => {
  return (
    <div className="sideMenu">
      <span className="icon">
        <FontAwesomeIcon icon="chevron-right" size="2x" />
      </span>

      <div>Meno Priezvisko</div>

      <div className="footer">
        <span>&copy; DegustatorApp 2022</span>
        <FontAwesomeIcon
          className="footerIcon"
          icon="wine-glass-alt"
          size="2x"
        />
      </div>
    </div>
  );
};
