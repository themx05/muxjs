import counter from "./counter";

export function SetupButtons() {
    let inc = document.querySelector("#inc") as HTMLButtonElement;
    let dec = document.querySelector("#dec") as HTMLButtonElement;

    inc.onclick = () => {
        counter.value += 1;
    };

    dec.onclick = () => {
        counter.value -= 1;
    }
}


export function RenderCounter() {
    let element = document.querySelector("#count");
    const render = () => {
        element!.innerHTML = counter.value + "";
    }
    counter.onChange((signal) => {
        if(signal.data.previous > signal.data.value) {
            console.log(`Counter decreased from ${signal.data.previous} to ${signal.data.value}`);
        }
        else if(signal.data.previous < signal.data.value) {
            console.log(`Counter increased from ${signal.data.previous} to ${signal.data.value}`);
        }
        render();
    });
    render();
}