import { Muxer } from "muxjs-core";
import { createContext } from "react";

export const MuxerContext = createContext<Muxer>(undefined as any);
