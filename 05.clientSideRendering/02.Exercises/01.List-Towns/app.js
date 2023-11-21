import { html, render } from "./node_modules/lit-html/lit-html.js";

document.getElementById("btnLoadTowns").addEventListener("click", (event) => {
    event.preventDefault();
    
    const input = document.querySelector('#towns').value;
    const towns = input.split(', ');

    const townTemplate = html`
    <ul>
    ${towns.map((town) => html`<li>${town}</li>`)}
    </ul>
    `;

    const rootElem = document.getElementById('root');

    render(townTemplate, rootElem);
});