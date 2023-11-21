import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const townTemplate = html`
<ul>
${towns.map((town => html`<li id="${town}">${town}</li>`))}
</ul>
`;

const townsElem = document.getElementById('towns');

render(townTemplate, townsElem);

document.querySelector("button").addEventListener('click', onSearch);

function onSearch() {
   const text = document.getElementById("searchText").value;

   const result = towns.filter((t) => {
      if(t.includes(text)) {
         const match = document.getElementById(t);
         match.setAttribute('class', 'active');
         return t;
      }
   });

   const resultElem = document.getElementById('result');
   resultElem.textContent = `${result.length} matches found`
}
