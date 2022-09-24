import { Muxer } from "muxjs-core";
import React, { PropsWithChildren } from "react";
import { MuxerContext } from "./context";
import { useMuxer } from "./hooks/useMuxer";
import { useMuxerChannel } from "./hooks/useMuxerChannel";
import { useMuxerChannels } from "./hooks/useMuxerChannels";
import { useMuxObject } from "./hooks/useMuxObject";
import { useSignal } from "./hooks/useSignal";


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
export { useMuxObject } from "./hooks/useMuxObject";
export { useSignal } from "./hooks/useSignal";


const MuxReact = {
  MuxProvider,
  useMuxer,
  useMuxerChannel,
  useMuxerChannels,
  useMuxObject,
  useSignal
}

export default MuxReact;