import counter from "./counter";

export function SetupButtons() {
    let inc = document.querySelector("#inc") as HTMLButtonElement;
    let dec = document.querySelector("#dec") as HTMLButtonElement;

    inc.onclick = () => {
        counter.inc(1);
    };

    dec.onclick = () => {
        counter.dec(1);
    }
}


export function RenderCounter() {
    let element = document.querySelector("#count");
    const render = () => {
        element!.innerHTML = counter.value + "";
    }
    counter.onChange((current, prev) => {
        render();
    });
    render();
}