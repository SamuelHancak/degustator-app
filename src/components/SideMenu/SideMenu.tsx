import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
// styles
import "./SideMenu.css";
import { LoggedInUserContext } from "../../App";

export const SideMenu = () => {
  const loggedUser = useContext(LoggedInUserContext);
  const history = useHistory();

  return (
    <div className="sideMenu">
      <span className="icon">
        <FontAwesomeIcon icon="chevron-right" size="2x" />
      </span>

      <div style={{ fontWeight: 500, fontSize: "1.2rem" }}>
        {loggedUser.loggedInUser?.email}
      </div>

      <div className="sideMenuItemsWrapper">
        <div className="sideMenuItemWrapper">
          <SideMenuItem title="Zoznam vín" url="/wines" />

          {loggedUser.loggedInUser?.email !== "hodnotitel@mail.com" && (
            <SideMenuItem title="Pridať vzorku" url="/wines/create" />
          )}

          {/* {loggedUser.loggedInUser?.email === "admin3@mail.com" && (
            <SideMenuItem title="Konfigurácia" url="/configuration" />
          )} */}

          <SideMenuItem title="Konfigurácia" url="/configuration" />

          <SideMenuItem revertedColors title="Nastavenia" url="/settings" />
        </div>

        <div>
          <SideMenuItem
            revertedColors
            title="Odhlásiť sa"
            onClick={() => {
              loggedUser.logOut();
              history.push("/log-in");
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
