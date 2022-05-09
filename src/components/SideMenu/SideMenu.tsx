import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
// styles
import "./SideMenu.css";
import axios from "axios";

export const SideMenu = () => {
  const [loggedUser, setLoggedUser] = useState<any>();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/wines/wines/userId/${localStorage.getItem(
          "loggedUserId"
        )}`
      )
      .then((response) => {
        setLoggedUser(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="sideMenu">
      <span className="icon">
        <FontAwesomeIcon icon="chevron-right" size="2x" />
      </span>

      <div
        style={{
          fontWeight: 500,
          fontSize: "1.2rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "150px",
        }}
      >
        {loggedUser?.email}
      </div>

      <div className="sideMenuItemsWrapper">
        <div className="sideMenuItemWrapper">
          <SideMenuItem title="Zoznam vín" url="/wines" />

          {loggedUser?.prava !== "3" && (
            <SideMenuItem title="Pridať vzorku" url="/wines/create" />
          )}

          {loggedUser?.prava === "0" && (
            <SideMenuItem title="Konfigurácia" url="/configuration" />
          )}

          <SideMenuItem revertedColors title="Nastavenia" url="/settings" />
        </div>

        <div>
          <SideMenuItem
            revertedColors
            title="Odhlásiť sa"
            onClick={() => {
              history.push("/log-in");
              localStorage.setItem("loggedUserId", "");
            }}
          />
        </div>
      </div>

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

interface ISideMenuItemProps {
  revertedColors?: boolean;
  title: string;
  url?: string;
  onClick?: () => void;
}

const SideMenuItem = ({
  revertedColors = false,
  title,
  url,
  onClick,
}: ISideMenuItemProps) => {
  const history = useHistory();

  return (
    <div
      className={revertedColors ? "sideMenuItemReverted" : "sideMenuItem"}
      onClick={() => {
        url ? history.push(`${url}`) : onClick?.();
      }}
    >
      {title}
    </div>
  );
};
