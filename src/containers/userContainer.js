import {
  getTokenOnStartup,
  tokenProperties,
  triggerLogin,
  triggerLogout,
} from "~/utils/auth";
import { useEffect, useState } from "react";

import SketchesContainer from "./sketchesContainer";
import { createContainer } from "unstated-next";
import { useContainer } from "unstated-next";

const UserContainer = () => {
  const { reset } = useContainer(SketchesContainer);
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
