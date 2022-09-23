import { Muxer } from "muxjs-core";
import React, { PropsWithChildren } from "react";
import { MuxerContext } from "./_context";
import useMuxer from "./hooks/useMuxer";
import useMuxerChannel from "./hooks/useMuxerChannel";
import useMuxerChannels from "./hooks/useMuxerChannels";

function MuxProvider({ muxer, children }: PropsWithChildren<{ muxer: Muxer }>) {
  return (
    <MuxerContext.Provider value={muxer}>{children}</MuxerContext.Provider>
  );
}

export { MuxProvider, useMuxer, useMuxerChannel, useMuxerChannels };
