import React, { useRef, useEffect, useState } from "react";
import { useContainer } from "unstated-next";
import SketchesContainer from "./sketchesContainer";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useContextMenu from "./useContextMenu";
import isElectron from "./utils/isElectron";
import history from "../utils/history";
import "./List.css";

const ListItem = ({ sketch, selected, showControls }) => {
  const ref = useRef(null);
  const { rename, sketches, deleteSketch } = useContainer(SketchesContainer);
  const [renaming, setRenaming] = useState(false);
  const name = sketch.name || "Untitled";

  const confirmAndDelete = () => {
    if (!confirm("Delete this sketch?")) return;
    const sketchIndex = sketches.findIndex((s) => s.id === sketch.id);
    const id = sketches[sketchIndex - 1]?.id;
    setTimeout(() => history.push(`/${id}`));
    deleteSketch(sketch.id);
  };

  if (isElectron()) {
    useContextMenu(
      ref,
      {
        showInspectElement: process.env.NODE_ENV !== "production",
        items: [
          {
            id: "rename-command",
            enabled: showControls,
            label: "Rename",
            click: () => setRenaming(true),
          },
          {
            id: "delete-command",
            enabled: showControls,
            label: "Delete",
            click: confirmAndDelete,
          },
        ],
      },
      []
    );
  }

  useEffect(() => {
    if (selected) ref.current.scrollIntoViewIfNeeded();
  }, [selected]);

  return (
    <Link
      ref={ref}
      to={`/${sketch.id}`}
      key={sketch.id}
      className={`sketch ${selected && "selected"}`}
    >
      <div className="video-wrapper">
        <video muted loop>
          <source
            id="media-source"
            src={`${sketch.video_url}#t=2`}
            type="video/mp4"
          />
        </video>
      </div>

      {renaming ? (
        <input
          defaultValue={name}
          autoFocus
          onBlur={() => setRenaming(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const name = e.target.value;
              rename(sketch.id, name);
              setRenaming(false);
            }
            if (e.key === "Escape") {
              setRenaming(false);
            }
          }}
        />
      ) : (
        name
      )}
      {!isElectron() && (
        <div className="actions">
          <FiEdit3 className="rename" onClick={() => setRenaming(true)} />
          <RiDeleteBin2Line className="delete" onClick={confirmAndDelete} />
        </div>
      )}
    </Link>
  );
};
export default ListItem;
