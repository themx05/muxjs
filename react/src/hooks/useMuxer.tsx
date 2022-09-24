import { useContext } from "react";
import { MuxerContext } from "../context";

export const useMuxer = () => {
    const ctx = useContext(MuxerContext);
    if (!ctx) {
        throw new Error("useMuxer should only be called within a MuxProvider");
    }
    return ctx;
};