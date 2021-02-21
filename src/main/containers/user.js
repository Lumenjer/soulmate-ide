import * as SentryReact from "@sentry/react";
import { createContainer } from "unstated-next";

import { mutate } from "~/hooks/useSwr";
import { logBackIn, logIn, logOut } from "~/utils/auth";
import { SKETCHES_PATH } from "~/utils/network";

const admin = "google-oauth2|102941484361041922849";

const UserContainer = () => {
  const [userDetails, setUserDetails] = useState(undefined);

  useEffect(() => {
    logBackIn().then(setUserDetails);
  }, []);

  useEffect(() => {
    SentryReact.setUser({
      name: userDetails?.name,
      username: userDetails?.name,
      id: userDetails?.sub,
      avatarUrl: userDetails?.picture,
      ...userDetails,
    });

    mutate(SKETCHES_PATH);
  }, [userDetails]);

  const login = async () => logIn().then(setUserDetails);
  const logout = async () => logOut().then(setUserDetails);
  const isAdmin = () => userDetails?.sub === admin;

  return { userDetails, login, logout, isAdmin };
};

export default createContainer(UserContainer);
