import React from "react";
import { Card as CardDefault, CardContent } from "@mui/material";
import "./Card.css";

interface ICardProps {
  children: any;
  className?: string;
}

export const Card = ({ children, className }: ICardProps) => {
  return (
    <CardDefault className={className}>
      <CardContent>{children}</CardContent>
    </CardDefault>
  );
};
