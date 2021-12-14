import React, { createContext, useState } from "react";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Redirect, Route } from "react-router-dom";
// pages
import { ConfigurationPage } from "./pages/Configuration/ConfigurationPage";
import { ConfigurationHodnotitelPage } from "./pages/Configuration/ConfigurationHodnotitelPage";
import { ConfigurationKomisiaPage } from "./pages/Configuration/ConfigurationKomisiaPage";
import { ConfigurationVystavovatelPage } from "./pages/Configuration/ConfigurationVystavovatel";
import { LogInPage } from "./pages/LogIn/LogInPage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
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

export type LoggedInUserType = {
  email: string;
  password: string;
};

export const LoggedInUserContext = createContext<{
  loggedInUser: LoggedInUserType | null | undefined;
  setLoggedInUser: (data: LoggedInUserType | null) => void;
}>({
  loggedInUser: null,
  setLoggedInUser: () => {
    // do nothing
  },
});

function App() {
  const [loggedInUser, setLoggedInUser] = useState<
    LoggedInUserType | null | undefined
  >({ email: "admin@mail.com", password: "ss" }); //TODO: update default value to null

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <Route exact path="/log-in">
        <LogInPage />
      </Route>

      <Layout>
        <Route exact path="/">
          <Redirect to="/wines" />
        </Route>

        <Route exact path="/settings">
          <ProfilePage />
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

        <Route exact path="/configuration/hodnotitel">
          <ConfigurationHodnotitelPage />
        </Route>

        <Route exact path="/configuration/komisia">
          <ConfigurationKomisiaPage />
        </Route>

        <Route exact path="/configuration/vystavovatel">
          <ConfigurationVystavovatelPage />
        </Route>
      </Layout>
    </LoggedInUserContext.Provider>
  );
}

export default App;
