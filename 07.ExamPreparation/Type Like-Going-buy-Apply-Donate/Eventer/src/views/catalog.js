import { getAll } from '../api/data.js';
import { html } from '../lib.js';

// this is dashboard also
const catalogTemplate = (catalogs) => html`
<h2>Current Events</h2>
<section id="dashboard">
  ${catalogs.length == 0
    ? html`<h4>No Events yet.</h4>`
    : catalogs.map(
        (catalog) => html`       
        <div class="event">
    <img src="${catalog.imageUrl}" alt="example1" />
    <p class="title">
    ${catalog.name}
    </p>
    <p class="date">${catalog.date}</p>
    <a class="details-btn" href="/details/${catalog._id}">Details</a>
  </div>
        `
      )}
</section>`;

export async function showCatalog(ctx) {
    const catalogs = await getAll();

    ctx.render(catalogTemplate(catalogs));
}
