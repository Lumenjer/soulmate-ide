// import { remoteRequire } from "./remoteRequire";

export const getPort = async () => {
  const serialport = window.require("serialport");
  const results = await serialport.list();

  const port = results.find((result) => {
    if (result.vendorId === "1a86") return true;
    if (result.vendorId === "0403") return true;
    if (result.path.includes("usbserial")) return true;
    if (result.path.includes("tty.wchusbserial")) return true;
    if (result.path.includes("cu.SLAB_USBtoUART")) return true;
  });

  if (!port) return false;
  return port.path;
};

export const getPorts = async () => {
  const serialport = window.require("serialport");
  const results = await serialport.list();

  const ports = results.filter((result) => {
    if (result.vendorId === "1a86") return true;
    if (result.vendorId === "10c4") return true;
    if (result.vendorId === "0403") return true;
    if (result.path.includes("usbserial")) return true;
    if (result.path.includes("tty.wchusbserial")) return true;
    if (result.path.includes("cu.SLAB_USBtoUART")) return true;
  });

  return ports;
};

export class PortListener {
  constructor(path, callback) {
    this.path = path;
    this.callback = callback;
    if (path) {
      console.log("Listening to", path);
      const serialport = window.require("serialport");
      const port = new serialport(path, { baudRate: 115200 });
      this.port = port;
      const parser = port.pipe(new serialport.parsers.Readline());
      parser.on("data", callback);
      this.port.write('{ "status": true }\n');
    } else {
      console.log("No port path given");
    }
  }

  close() {
    if (this.port && this.port?.isOpen) {
      this.port.close();
    }
  }
}
