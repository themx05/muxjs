import { Signal } from "./signal";

export class Muxer {
    private _channel: MessageChannel;

    constructor() {
        this._channel = new MessageChannel();
        /// prevent this from server-side execution
        if (globalThis.window) {
            this._channel.port1.start();
            this._channel.port2.start();
        }
    }

    private get _input() {
        return this._channel.port1;
    }

    private get _output() {
        return this._channel.port2;
    }

    dispatch<T = any>(channel: string, payload: T) {
        if (!channel) {
            return;
        }
        this._input.postMessage({
            _channel: channel,
            _payload: payload
        });
    }

    subscribeOnly<T = any>(channel: string, callback: (signal: Signal<T>) => any) {
        let listener = async (ev: MessageEvent<any>) => {
            if (ev.data?._channel) {
                let signal = new Signal(ev);
                if (signal.channel === channel) {
                    await callback(signal);
                }
            }
        }
        this._output.addEventListener("message", listener);
        return () => {
            this._output.removeEventListener("message", listener);
        }
    }

    subscribeMultiple<T = any>(channels: string[], callback: (signal: Signal<T>) => any) {
        let listener = async (ev: MessageEvent<any>) => {
            if (ev.data?._channel) {
                let signal = new Signal(ev);
                if (channels.includes(signal.channel)) {
                    await callback(signal);
                }
            }
        }
        this._output.addEventListener("message", listener);
        return () => {
            this._output.removeEventListener("message", listener);
        }
    }

    subscribeMatch<T = any>(channel: string | RegExp, callback: (signal: Signal<T>) => any) {
        let listener = async (ev: MessageEvent<any>) => {
            if (ev.data?._channel) {
                let signal = new Signal(ev);
                signal.expression = channel;
                if (signal.match) {
                    await callback(signal);
                }
            }
        }
        this._output.addEventListener("message", listener);
        return () => {
            this._output.removeEventListener("message", listener);
        }
    }
}