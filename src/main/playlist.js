import CodeEditor from "~/components/codeEditor";
import history from '~/utils/history';
import Header from "~/components/header";
import PlaylistMenu from "~/components/PlaylistMenu";
import Simulator from "~/components/simulator";
import BuildsContainer from "~/containers/builds";
import PlaylistContainer from "~/containers/playlists";
import { emptyCode } from "~/utils/code";

const Playlist = (props) => {
  const id = parseInt(props.id);

  const { playlists, savePlaylist, destroyPlaylist } = PlaylistContainer.useContainer();
  const { getBuild } = BuildsContainer.useContainer();

  const playlist = playlists?.find((p) => parseInt(p.id) === parseInt(id));
  if (!playlist) return <>Loading...</>;
  const [sketches, setSketches] = useState(playlist.sketches || []);
  const [index, setIndex] = useState(0);
  const sketch = sketches[index];
  const { config } = playlist;
  const build = getBuild(sketch?.code || emptyCode, config);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

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
    <div className="flex-grow">
      <Header
        actions={[{ title: "Save" }, { title: "Publish" }, menu]}
        sections={[{ title: "Playlists", to: "/playlists" }]}
        title={playlist.name}
      />

      <div className="flex flex-row flex-grow h-full">
        <PlaylistMenu
          index={index}
          onChange={(sketches) => {
            setSketches(sketches);
            savePlaylist(playlist.id, { sketches });
          }}
          setIndex={setIndex}
          sketches={sketches}
        />

        <div className="flex flex-row flex-grow">
          <CodeEditor
            build={build}
            className="relative flex-grow flex-shrink w-6/12 min-w-0 bg-white"
            code={sketch?.code || emptyCode}
            key={index}
            onChange={(code) => {
              sketches[index].code = code;
              setSketches(sketches);
            }}
            onSave={(code) => {
              sketches[index].code = code;
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
      </div>
    </div>
  );
};

const WrappedPlaylist = (props) => (
  <PlaylistContainer.Provider>
    <BuildsContainer.Provider>
      <Playlist {...props} />
    </BuildsContainer.Provider>
  </PlaylistContainer.Provider>
);

export default WrappedPlaylist;