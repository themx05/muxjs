import { RenderCounter, SetupButtons } from './render';
import './style.css'

export function RenderApp() {

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Muxer-based Counter</h1>
    <div class="card">
      <button id="inc" type="button">increment</button>
      <button id="dec" type="button">decrement</button>
    </div>
    <div class="card">
      <p>Counter is <span id="count"></span></p>
    </div>
  </div>
`

  SetupButtons();
  RenderCounter();
}