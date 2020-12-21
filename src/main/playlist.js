import useSWR, { mutate } from "swr";

import CodeEditor from "~/components/codeEditor";
import Header from "~/components/header";
import PlaylistMenu from "~/components/PlaylistMenu";
import Simulator from "~/components/simulator";
import BuildsContainer from "~/containers/builds";
import SoulmatesContainer from "~/containers/soulmates";
import Logo from "~/images/logo.svg";
import { PLAYLISTS_URL } from "~/urls";
import { post, postDelete, put } from "~/utils";
import { emptyCode } from "~/utils/code";
import history from "~/utils/history";

const savePlaylist = async (id, data, build) => {
  var formData = new FormData();
  formData.append("sketches", JSON.stringify(data.sketches));
  if (build) {
    const blob = new Blob([fs.readFileSync(build)]);
    formData.append("build", blob, "firmware.bin");
  }
  await put(`/my-playlists/${id}`, formData);
  mutate(PLAYLISTS_URL);
};

const destroyPlaylist = async (id) => {
  await postDelete(`/my-playlists/${id}`);
  mutate(PLAYLISTS_URL);
};

const unpublishPlaylist = async (id) => {
  await post(`/my-playlists/${id}/unpublish`);
  mutate(PLAYLISTS_URL);
};

const Playlist = (props) => {
  const { getBuild } = BuildsContainer.useContainer();
  const soulmates = SoulmatesContainer.useContainer();

  const id = parseInt(props.id);
  const { data: playlists } = useSWR(PLAYLISTS_URL);

  const [publishing, setPublishing] = useState(false);
  const playlist = playlists?.find((p) => parseInt(p.id) === parseInt(id));
  const [sketches, setSketches] = useState(playlist?.sketches);
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!sketches && playlist?.sketches) {
      setSketches(playlist.sketches);
      setIndex(0);
    }
  }, [playlist?.sketches]);

  useEffect(() => {
    if (index >= sketches?.length) setIndex(sketches.length - 1);
  }, [sketches, index]);

  const sketch = sketches ? sketches[index] : {};
  const { config } = playlist || {};

  let build;
  if (playlist?.sketches) {
    const code = playlist.sketches[index]?.code || emptyCode;
    build = getBuild(code, config);
  }

  const save = () => {
    savePlaylist(playlist.id, { sketches });
    setDirty(false);
  };

  const publish = async () => {
    setPublishing(true);
    const build = await soulmates.getBuild(sketches, config);
    // TODO: Catch errors here
    if (!build) {
      alert("There was an error building.");
    } else {
      await savePlaylist(playlist.id, { sketches }, build);
    }
    setPublishing(false);
  };

  if (!playlist) return <Logo className="loading-spinner" />;

  const menu = (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div>
        <span className="rounded-md shadow-sm">
          <button
            aria-expanded="true"
            aria-haspopup="true"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md leading-5 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
            id="options-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            Options
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                clipRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>

      {menuOpen && (
        <div className="absolute right-0 z-20 w-56 mt-2 shadow-lg origin-top-right rounded-md">
          <div
            aria-labelledby="options-menu"
            aria-orientation="vertical"
            className="bg-white rounded-md shadow-xs"
            role="menu"
          >
            <div className="py-1">
              <button
                className="flex-grow block w-full px-4 py-2 text-sm text-left text-gray-700 leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                onClick={() => {
                  setMenuOpen(false);
                  // setRenaming(true);
                }}
                role="menuitem"
              >
                Rename
              </button>
            </div>
            <div className="py-1">
              <button
                className="flex-grow block w-full px-4 py-2 text-sm text-left text-gray-700 leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                onClick={() => {
                  setMenuOpen(false);
                  destroyPlaylist(playlist.id);
                  history.push("/playlists");
                }}
                role="menuitem"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col flex-grow flex-shrink h-full">
      <Header
        actions={[
          dirty && { title: "Save", onClick: save },
          { title: publishing ? "Publishing..." : "Publish", onClick: publish },
          playlist.url && {
            title: "Un-publish",
            onClick: () => {
              unpublishPlaylist(playlist.id);
            },
          },
          menu,
        ]}
        sections={[{ title: "Playlists", to: "/playlists" }]}
        title={
          <>
            {playlist.name}
            <span className="px-4 py-2 m-2 text-sm bg-gray-200 rounded-full border-1">
              {playlist.url ? "published" : "not published"}
            </span>
            {dirty && (
              <span className="px-4 py-2 m-2 text-sm bg-red-200 rounded-full border-1">
                Has changes
              </span>
            )}
          </>
        }
      />

      <div className="flex flex-row flex-grow flex-shrink min-h-0">
        <PlaylistMenu
          index={index}
          onChange={(sketches) => {
            setSketches(sketches);
            savePlaylist(playlist.id, { sketches });
            setDirty(true);
          }}
          setIndex={setIndex}
          sketches={sketches}
        />

        {sketches && sketches[index] ? (
          <div className="flex flex-row flex-grow flex-shrink min-w-0 min-h-0">
            <CodeEditor
              build={build}
              className="relative flex-grow flex-shrink w-6/12 min-w-0 min-h-0 bg-white"
              code={sketch?.code || emptyCode}
              key={index}
              onChange={(code) => {
                sketches[index].code = code;
                setSketches(sketches);
                setDirty(true);
              }}
              onSave={(code) => {
                setDirty(false);
                sketches[index].code = code;
                setSketches(sketches);
                savePlaylist(playlist.id, { sketches });
              }}
            />

            <Simulator
              build={build}
              className="flex flex-col flex-grow"
              config={config}
              minWidth={320}
            />
          </div>
        ) : (
          <Logo className="loading-spinner" />
        )}
      </div>
    </div>
  );
};

const WrappedPlaylist = (props) => (
  <BuildsContainer.Provider>
    <Playlist {...props} />
  </BuildsContainer.Provider>
);

export default WrappedPlaylist;
