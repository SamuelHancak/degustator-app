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
  loggedInUser: LoggedInUserType | null | undefined;
  setLoggedInUser: (data: LoggedInUserType | null) => void;
  signUp: (data: LoggedInUserType) => void;
  logIn: (data: LoggedInUserType) => void;
  logOut: () => void;
}>({
  loggedInUser: null,
  setLoggedInUser: () => {
    // do nothing
  },
  signUp: () => {
    // do nothing
  },
  logIn: () => {
    // do nothing
  },
  logOut: () => {
    // do nothing
  },
});

function App() {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  const signUp = ({ email, password }: LoggedInUserType) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const logIn = ({ email, password }: LoggedInUserType) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logOut = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedInUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <LoggedInUserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        signUp,
        logIn,
        logOut,
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
