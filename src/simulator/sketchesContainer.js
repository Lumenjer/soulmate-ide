import { createContainer } from "unstated-next";
import { buildHex } from "./compiler/compile";
import { fetchJson, post, postDelete } from "./utils";
import { useState } from "react";
import { prepareCode } from "./code";

import { getToken, loggedIn } from "./utils/auth";

const SketchesContainer = () => {
  const [sketches, setSketches] = useState(undefined);
  const [allSketches, setAllSketches] = useState(undefined);
  const [builds, setBuilds] = useState({});

  const fetchSketches = async () => {
    if (await loggedIn()) {
      const token = await getToken();
      const newSketches = await fetchJson("/sketches/list", token);
      setSketches(newSketches);
    }

    const newAllSketches = await fetchJson("/sketches/list");
    setAllSketches(newAllSketches);
  };

  const getSketch = (id) => {
    return (
      sketches?.find((s) => s.id === id) ||
      allSketches?.find((s) => s.id === id)
    );
  };

  const save = async (id, code, config) => {
    let sketchIndex = sketches?.findIndex((s) => s.id === id);
    if (sketchIndex > -1) {
      sketches[sketchIndex] = { ...sketches[sketchIndex], code, config };
      setSketches([...sketches]);

      const token = await getToken();
      post("/sketches/save", token, { id, code, config });
    }

    let allSketchIndex = allSketches.findIndex((s) => s.id === id);
    if (allSketchIndex > -1) {
      allSketches[allSketchIndex] = {
        ...allSketches[allSketchIndex],
        code,
        config,
      };
      setAllSketches([...allSketches]);
    }
  };

  const createSketch = async (name) => {
    const token = await getToken();
    const newSketch = await post("/sketches/create", token, { name });
    await fetchSketches();
    return newSketch;
  };

  const deleteSketch = async (id) => {
    setSketches(sketches.filter((s) => s.id !== id));
    const token = await getToken();
    if (!token) return;
    await postDelete(`/sketches/${id}`, token);
    fetchSketches();
  };

  const reset = () => {
    setSketches(undefined);
    fetchSketches();
  };

  const buildSketch = async (id, code) => {
    if (!code || !id) return;

    setBuilds({ ...builds, [id]: undefined });

    const sketch = getSketch(id);
    if (!sketch) return;
    const config = sketch.config || {};
    const { rows = 70, cols = 15 } = config;
    const preparedCode = prepareCode(code, rows, cols);
    const newBuild = await buildHex(preparedCode);
    setBuilds({ ...builds, [id]: newBuild });
  };

  return {
    sketches,
    allSketches,
    fetchSketches,
    createSketch,
    deleteSketch,
    reset,
    getSketch,
    buildSketch,
    builds,
    save,
  };
};

export default createContainer(SketchesContainer);
