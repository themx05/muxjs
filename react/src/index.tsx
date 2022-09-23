import { Muxer } from "muxjs-core";
import React, { PropsWithChildren } from "react";
import { MuxerContext } from "./_context";

export function MuxProvider({
  muxer,
  children,
}: PropsWithChildren<{ muxer: Muxer }>) {
  return (
    <MuxerContext.Provider value={muxer}>{children}</MuxerContext.Provider>
  );
}

export { useMuxer } from "./hooks/useMuxer";
export { useMuxerChannel } from "./hooks/useMuxerChannel";
export { useMuxerChannels } from "./hooks/useMuxerChannels";
