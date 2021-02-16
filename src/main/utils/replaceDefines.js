const uniqueDefines = (sketch) => {
  const _originalSketch = sketch;
  const variables = {};

  try {
    sketch.split("\n").forEach((line) => {
      if (line.trim().includes("#define ")) {
        const declaration = line.trim().split("#define")[1].trim();
        let [key, ...value] = declaration.split(" ");
        key = key.trim();
        value = value.join(" ").split("//")[0];
        variables[key] = value;
      }
      return line;
    });

    Object.keys(variables)
      .reverse()
      .forEach((key) => {
        sketch = sketch
          .split("\n")
          .map((line) => {
            if (line.includes(`#define`) && line.includes(`${key}`)) return "";

            if (!line.includes(`#define ${key}`)) {
              const matcher = `${key}(?=[^A-Za-z0-9])`;
              const regex = new RegExp(matcher, "g");
              line = line.replace(regex, variables[key]);
            }
            return line;
          })
          .join("\n");
      });
  } catch (e) {
    return _originalSketch;
  }

  return sketch;
};

export default uniqueDefines;
