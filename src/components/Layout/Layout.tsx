import React from "react";
import { SideMenu } from "../SideMenu/SideMenu";
import "./Layout.css";

interface ILayoutProps {
  children: any;
}
export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="layout">
      <SideMenu />
      {children}
    </div>
  );
};
