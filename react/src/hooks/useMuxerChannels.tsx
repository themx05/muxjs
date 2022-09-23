import { Signal } from "muxjs-core";
import { useEffect } from "react";
import { useMuxer } from "./useMuxer";

export function useMuxerChannels<T = any>(
  channels: string[],
  signalHandler?: (signal: Signal<T>) => any
) {
  const muxer = useMuxer();

  useEffect(() => {
    if (signalHandler) {
      let subscription = muxer.subscribeMultiple(channels, signalHandler);
      return subscription;
    }
    return () => {};
  }, [muxer, signalHandler]);

  return {
    muxer,
  };
}
