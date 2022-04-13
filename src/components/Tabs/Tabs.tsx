import React, { useState } from "react";
import { Tab, Tabs as TabsImport } from "@mui/material";
// styles
import "./Tabs.css";

interface ITabsProps {
  activeTab: number | boolean;
  isScrollable?: boolean;
  tabs?: ILinkTabProps[];
}

export const Tabs = ({ activeTab, isScrollable = false, tabs }: ITabsProps) => {
  const [value, setValue] = useState<number | boolean>(activeTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <TabsImport centered className="tabs" value={value} onChange={handleChange}>
      {tabs?.map((i, index) => (
        <LinkTab key={index} label={i.label} onClick={i.onClick} />
      ))}
    </TabsImport>
  );
};

interface ILinkTabProps {
  label?: string;
  onClick?: () => void;
}

const LinkTab = (props: ILinkTabProps) => {
  return (
    <Tab
      component="a"
      // icon={
      //   <FontAwesomeIcon
      //     className="footerIcon"
      //     icon="wine-glass-alt"
      //     size="2x"
      //   />
      // }
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        props.onClick?.();
      }}
      {...props}
    />
  );
};
