import { getAll } from '../api/data.js';
import { html } from '../lib.js';

// this is dashboard also
const catalogTemplate = (fruits) => html`
<h2>Fruits</h2>
<section id="dashboard">
    ${fruits.length > 0 
    ? html`${fruits.map(fruitTemplate)}</section>` 
    : html`<h2>No fruit info yet.</h2>`} `;

const fruitTemplate = (fruit) => html`
<div class="fruit">
    <img src=${fruit.imageUrl} alt="example1" />
    <h3 class="title">${fruit.name}</h3>
    <p class="description">${fruit.description}</p>
    <a class="details-btn" href="/details/${fruit._id}">More Info</a>
</div>`;

export async function showCatalog(ctx) {
    const fruits = await getAll();

    ctx.render(catalogTemplate(fruits));
}
