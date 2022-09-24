import { Signal } from "muxjs-core";
import { useCallback, useState } from "react";

export function useSignal<T>() {
    const [previous, setPrevious] = useState<Signal<T> | undefined>(undefined);
    const [current, setCurrent] = useState<Signal<T>>();

    const update = useCallback((signal: Signal<T>) => {
        setPrevious(current);
        setCurrent(signal);
    }, []);

    return { previous, current, update };
}