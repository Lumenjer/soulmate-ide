import Header from "~/components/Header";
import { Link } from "react-router-dom";
import Sketch from "~/components/sketch";
import SketchesContainer from "~/containers/sketches";
import UserContainer from "~/containers/user";
import uniqBy from "lodash/uniqBy";

const Gallery = ({ mine }) => {
  const { userDetails } = UserContainer.useContainer();
  const { allSketches } = SketchesContainer.useContainer();
  const [search, setSearch] = useState("");

  if (!allSketches) return <></>;

  const filteredSketches = allSketches?.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  let users = uniqBy(
    filteredSketches?.map((sketch) => sketch.user),
    (user) => user.id
  );

  users = users.filter((u) => u.uid !== userDetails.sub);

  users = users?.map((u) => ({
    ...u,
    sketches: filteredSketches.filter((s) => s.user.id === u.id),
  }));

  return (
    <div className="flex flex-col flex-grow">
      <Header
        title="Gallery"
        actions={[
          <input
            key="search"
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="form-input block w-full sm:text-sm sm:leading-3"
          />,
        ]}
      />

      <div className="p-8 overflow-auto flex flex-col flex-grow flex-shrink bg-white dark-mode:bg-gray-900 dark-mode:text-white">
        {users?.map((user) => (
          <div className="pb-4" key={user.id}>
            <h3 className="mb-2 text-lg">{user.name}</h3>
            <ul className="flex flex-row flex-wrap">
              {user.sketches?.map((sketch) => (
                <Link
                  key={sketch.id}
                  to={
                    mine ? `/my-patterns/${sketch.id}` : `/gallery/${sketch.id}`
                  }
                >
                  <Sketch sketch={sketch} className="mr-4 mb-4" />
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;