import { Signal } from "muxjs-core";
import { useEffect } from "react";
import { useMuxer } from "./useMuxer";
import { useSignal } from "./useSignal";

export function useMuxerChannels<T = any>(
  channels: string[],
  signalHandler?: (signal: Signal<T>) => any
) {
  const muxer = useMuxer();
  const signal = useSignal();

  useEffect(() => {
    let subscription = muxer.subscribeMultiple<T>(channels, (s) => {
      signal.update(s);
      if (signalHandler) {
        signalHandler(s);
      }
    });
    return subscription;
  }, [muxer, signalHandler]);

  return {
    muxer,
    previous: signal.previous,
    latest: signal.current,
  };
}
