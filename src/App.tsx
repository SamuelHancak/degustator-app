import React from "react";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Redirect, Route } from "react-router-dom";
// pages
import { ConfigurationPage } from "./pages/Configuration/ConfigurationPage";
import { WineCreatePage } from "./pages/WineCreate/WineCreatePage";
import { WineDetailPage } from "./pages/WineDetail/WineDetailPage";
import { WineRatePage } from "./pages/WineRate/WineRatePage";
import { WinesTablePage } from "./pages/WinesTable/WinesTablePage";
// icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWineGlassAlt,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(faWineGlassAlt, faChevronRight);

function App() {
  return (
    <Layout>
      <Route exact path="/">
        <Redirect to="/wines" />
      </Route>

      <Route exact path="/wines">
        <WinesTablePage />
      </Route>

      <Route exact path="/wines/detail/:wineId">
        <WineDetailPage />
      </Route>

      <Route exact path="/wines/create">
        <WineCreatePage />
      </Route>

      <Route exact path="/wines/rate/:wineId">
        <WineRatePage />
      </Route>

      <Route exact path="/configuration">
        <ConfigurationPage />
      </Route>
    </Layout>
  );
}

export default App;
