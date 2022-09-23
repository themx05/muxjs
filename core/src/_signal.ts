import { formatRegex } from "./_utils";

interface EventBase<T> {
    _channel: string;
    _payload: T;
}

export default class Signal<T = any> {
    event: MessageEvent<EventBase<T>>;
    expression?: RegExp | string;

    constructor(event: MessageEvent<EventBase<T>>) {
        this.event = event;
    }

    get channel() {
        return this.event.data?._channel;
    }

    get match() {
        if (this.expression) {
            let out = this.channel.match(typeof this.expression === "string" ? formatRegex(this.expression) : this.expression);
            return out;
        }
        return null;
    }

    get params() {
        return {
            ...this.match?.groups
        };
    }

    get data() {
        return this.event.data?._payload;
    }
}