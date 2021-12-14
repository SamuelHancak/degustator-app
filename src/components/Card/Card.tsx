import React from "react";
import { Card as CardDefault, CardContent } from "@mui/material";
import "./Card.css";

interface ICardProps {
  children: any;
  className?: string;
  style?: any;
}

export const Card = ({ children, className, style }: ICardProps) => {
  return (
    <CardDefault style={style} className={className}>
      <CardContent>{children}</CardContent>
    </CardDefault>
  );
};
