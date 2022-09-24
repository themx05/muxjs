import { Signal } from "./signal";
import { Muxer } from "./muxer";
import { MuxObject } from "./object";

const Mux = { Signal, Muxer, MuxObject };

export * from "./muxer";
export * from "./object";
export * from "./signal";

export default Mux;