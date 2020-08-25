import {
  getTokenOnStartup,
  tokenProperties,
  triggerLogin,
  triggerLogout,
} from "~/utils/auth";
import { useEffect, useState } from "react";

import SketchesContainer from "./sketches";
import { createContainer } from "unstated-next";

const UserContainer = () => {
  const { reset } = SketchesContainer.useContainer();
  const [userDetails, setUserDetails] = useState(undefined);

  const fetchUser = async () => {
    const newUserDetails = await tokenProperties();
    if (newUserDetails) {
      localStorage.loginSaved = "true";
    }
    setUserDetails(newUserDetails);
    reset();
  };

  useEffect(() => {
    if (localStorage.loginSaved) {
      getTokenOnStartup().then(() => {
        delete localStorage.loginPending;
        fetchUser();
      });
    } else if (localStorage.token) {
      delete localStorage.loginPending;
      fetchUser();
    } else {
      if (!localStorage.loginPending) {
        setUserDetails(false);
      }
      reset();
    }
  }, [localStorage.loginSaved, localStorage.token]);

  const login = async () => {
    console.log("login");
    await triggerLogin();
    fetchUser();
  };

  const logout = async () => {
    delete localStorage.loginSaved;
    await triggerLogout();
    fetchUser();
  };

  return { fetchUser, userDetails, login, logout };
};

export default createContainer(UserContainer);
