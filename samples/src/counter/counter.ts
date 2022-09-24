import { Muxer } from "muxjs-core";

const createCounter = (initialValue: number = 0) => {
  const muxer = new Muxer();
  return {
    _innerValue: initialValue,

    get value() {
      return this._innerValue;
    },

    set value(next: number) {
      let lastValue = this._innerValue;
      this._innerValue = next;
      muxer.dispatch("counter/updated", { value: this.value, previous: lastValue });
    },

    onChange(cb: (value: number, previous: number) => any) {
      let cancel = muxer.subscribeOnly("counter/updated", signal => {
        cb(signal.data?.value, signal?.data.previous);
      });
      return cancel;
    },

    inc(by: number) {
      this.value += by;
    },

    dec(by: number) {
      this.value -= by;
    },

  }
}

const counter = createCounter(0); /// your reactive counter
export default counter;