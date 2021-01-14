import uniqBy from "lodash/uniqBy";
import useSWR from "swr";

import Header, { PersonSection } from "~/components/Header";
import TimeGroupedSketches from "~/components/timeGroupedSketches";
import Logo from "~/images/logo.svg";
import { fetcher } from "~/utils";
import { ALL_SKETCHES_URL } from "~/utils/urls";

const User = ({ id }) => {
  const { data: allSketches } = useSWR(ALL_SKETCHES_URL, fetcher);

  let users = uniqBy(
    allSketches?.map((sketch) => sketch.user),
    (user) => user?.id
  )?.map((u) => ({
    ...u,
    sketches: (allSketches || []).filter((s) => s.user?.id === u?.id),
  }));

  let user = users.find((user) => user?.id === parseInt(id));

  if (!user) return <Logo className="loading-spinner" />;

  const { sketches = [] } = user;

  return (
    <div className="flex flex-col flex-grow ">
      <Header
        sections={[{ title: "Gallery", to: "/gallery" }]}
        title={<PersonSection user={user} />}
      />

      <div className="flex-grow overflow-auto bg-white dark-mode:bg-gray-900 dark-mode:text-white">
        <TimeGroupedSketches sketches={sketches} />
      </div>
    </div>
  );
};

export default User;
