import axios from "axios";
import React, { useState } from "react";

export const TestPage = () => {
  const [data, setData] = useState<any>(undefined);
  axios
    .get("http://localhost:4000/wines/wines/one/620d062219ae238bc93223e0")
    .then((response) => {
      setData(response.data);
    })
    .catch((err) => console.log(err));

  return <div>{JSON.stringify(data)}</div>;
};
