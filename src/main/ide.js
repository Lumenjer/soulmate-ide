import "react-resizable/css/styles.css";

import classnames from "classnames";
import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { SWRConfig } from "swr";
import useSWR from "swr";

import Notifications from "~/components/notifications";
import UserContainer from "~/containers/user";
import Logo from "~/images/logo.svg";
import { ALL_SKETCHES_URL, SKETCHES_URL } from "~/urls";
import { fetcher } from "~/utils";
import isElectron from "~/utils/isElectron";

import Config from "./config";
import Console from "./console";
import PlaylistContainer from "./containers/playlists";
import Dashboard from "./dashboard";
import Download from "./download";
import Editor from "./editor";
import Flash from "./flash";
import Gallery from "./gallery";
import Menu from "./menu";
import MySketches from "./mySketches";
import Playlist from "./playlist";
import Playlists from "./playlists";
import User from "./user";
import Welcome from "./welcome";

const IDE = () => {
  useSWR(SKETCHES_URL, fetcher);
  useSWR(ALL_SKETCHES_URL, fetcher);

  const [focus, setFocus] = useState(true);
  const blur = !focus;

  useEffect(() => {
    window.ipcRenderer?.on("focus", (event, isFocused) => setFocus(isFocused));
  }, [window, window.ipcRenderer]);

  return (
    <div
      className={classnames(
        "flex flex-shrink flex-grow overflow-hidden bg-gray-100 dark-mode:bg-gray-300 font-medium"
      )}
      style={{
        WebkitUserSelect: "none",
        opacity: blur ? "0.9" : 1,
      }}
    >
      <Menu />

      <Notifications />

      <Suspense fallback={<Logo className="loading-spinner" />}>
        <div className="flex flex-row flex-grow flex-shrink w-full min-w-0 bg-gray-100 dark-mode:bg-gray-800 dark-mode:text-white">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>

            <Route exact path="/tutorial">
              <Welcome />
            </Route>

            <Route exact path="/my-patterns">
              <MySketches />
            </Route>

            <Route exact path="/gallery">
              <Gallery />
            </Route>

            <Route exact path="/flash">
              {isElectron() ? <Flash /> : <Download />}
            </Route>

            <Route exact path="/config">
              <Config />
            </Route>

            <Route
              path="/gallery/user/:id"
              render={({
                match: {
                  params: { id },
                },
              }) => <User id={id} />}
            />

            <Route
              path="/gallery/:id"
              render={({
                match: {
                  params: { id },
                },
              }) => <Editor id={id} />}
            />

            <Route
              path="/my-patterns/:id"
              render={({
                match: {
                  params: { id },
                },
              }) => <Editor id={id} mine />}
            />

            <Route path="/console">
              <Console />
            </Route>

            <Route
              path="/playlists/:id"
              render={({
                match: {
                  params: { id },
                },
              }) => <Playlist id={id} />}
            />

            <Route path="/playlists">
              <Playlists />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </div>
  );
};

const WrappedIde = (props) => (
  <SWRConfig value={{ fetcher }}>
    <UserContainer.Provider>
      <PlaylistContainer.Provider>
        <IDE {...props} />
      </PlaylistContainer.Provider>
    </UserContainer.Provider>
  </SWRConfig>
);

export default WrappedIde;
