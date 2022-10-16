import { MuxObject, Signal } from "muxjs-core";
import { useEffect, useState } from "react";

export function useMuxObject<T = any>(
  source: MuxObject<T>,
  onUpdate?: (signal: Signal<{ value: T; previous: T }>) => any
) {
  const [previous, setPreviousValue] = useState<T | undefined>(undefined);
  const [value, setValue] = useState(source.value);

  useEffect(() => {
    let subscription = source.onChange((signal) => {
      setValue(signal.data.value);
      setPreviousValue(signal.data.previous);
      if (onUpdate) {
        onUpdate(signal);
      }
    });
    return subscription;
  }, [source, onUpdate]);

  return { source, previous, value };
}
