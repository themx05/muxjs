import { Signal } from "muxjs-core";
import { useCallback, useEffect } from "react";
import useMuxer from "./useMuxer";

export default function useMuxerChannel<T = any>(channel: string, signalHandler?:(signal: Signal<T>) => any) {
    const muxer = useMuxer();

    useEffect(() => {
        if(signalHandler) {
            let subscription = muxer.subscribeOnly(channel, signalHandler);
            return subscription;
        }
        return () => {};
    }, [muxer, signalHandler]);

    const dispatch = useCallback((payload: T) => {
        muxer.dispatch(channel, payload);
    }, [muxer]);

    return {
        muxer,
        dispatch
    }
}