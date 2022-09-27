import { Signal } from "muxjs-core";
import { useCallback, useEffect } from "react";
import { useMuxer } from "./useMuxer";
import { useSignal } from "./useSignal";

export function useMuxerChannel<T = any>(
  channel: string,
  signalHandler?: (signal: Signal<T>) => any
) {
  const muxer = useMuxer();
  const signal = useSignal<T>();

  useEffect(() => {
    let subscription = muxer.subscribeOnly<T>(channel, (s) => {
      signal.update(s);
      if (signalHandler) {
        signalHandler(s);
      }
    });
    return subscription;
  }, [muxer, signalHandler]);

  const dispatch = useCallback(
    (payload: T) => {
      muxer.dispatch(channel, payload);
    },
    [muxer]
  );

  return {
    muxer,
    dispatch,
    previous: signal?.previous || undefined,
    latest: signal?.current || undefined,
  };
}
