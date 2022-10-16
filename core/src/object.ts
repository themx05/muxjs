import produce, { Draft } from "immer";
import { Muxer } from "./muxer";
import { Signal } from "./signal";

export class MuxObject<T = { [key: string]: any }> {
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

    get dispatch() {
        return this.#mux.dispatch
    }

    get subscribeOnly() {
        return this.#mux.subscribeOnly
    }

    get subscribeMultiple() {
        return this.#mux.subscribeMultiple
    }

    get subscripeMatch() {
        return this.#mux.subscribeMatch
    }

    /**
     * 
     * @param {(draft: Draft<T>) => any} callback
     * Uses immer to produce the next immutable state based on the callback passed, which is supposed to alter the given draft.
     * Prefer calling this function instead of directly calling `this.value = nextValue`
     */
    update(callback: (draft: Draft<T>) => any){
        this.value = produce(this.value, callback);
    }

    onChange(callback: (signal: Signal<{ value: T, previous: T }>) => any) {
        return this.#mux.subscribeOnly('setValue', callback);
    }
}