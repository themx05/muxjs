import { Muxer } from "muxjs-core";
import { createContext } from "react";

export const MuxerContext = createContext<Muxer>({ __unset: true } as any);
