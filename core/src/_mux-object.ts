import { Muxer } from "./_muxer";
import { Signal } from "./_signal";

export class Object<T = { [key: string]: any }> {
    #mux: Muxer;
    #value!: T;

    constructor(initialValue: T) {
        let mux = new Muxer();
        this.#mux = mux;
        this.value = initialValue;
    }

    get value() {
        return this.#value;
    }

    set value(next: T) {
        let prev = this.#value;
        this.#value = next;
        this.#mux.dispatch('setValue', {
            value: this.#value,
            previous: prev,
        });
    }

    onChange(callback: (signal: Signal<{ value: T, previous: T }>) => any) {
        return this.#mux.subscribeOnly('setValue', callback);
    }
}