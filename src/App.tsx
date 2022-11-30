import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Redirect, Route, useHistory } from "react-router-dom";
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

// firebase
import { auth } from "./firebase";

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
  loggedInUserId: string | undefined;
  setLoggedInUserId: (userId: string) => void;
}>({
  loggedInUserId: undefined,
  setLoggedInUserId: () => {
    // do nothing
  },
});

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState<any>(null);

  return (
    <LoggedInUserContext.Provider
      value={{
        loggedInUserId,
        setLoggedInUserId,
      }}
    >
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

        <Route exact path="/wines/detail/:wineId/:userId">
          <WineDetailPage />
        </Route>

        <Route exact path="/wines/create">
          <WineCreatePage />
        </Route>

        <Route exact path="/wines/rate/:wineId/:userId">
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
      )
    </LoggedInUserContext.Provider>
  );
}

export default App;
