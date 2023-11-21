import { getAll } from '../api/data.js';
import { html } from '../lib.js';

// this is dashboard also
const catalogTemplate = (catalogs) => html`
<section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
  ${catalogs.length == 0
    ? html`<p class="no-memes">No memes in database.</p>`
    : catalogs.map(
        (catalog) => html`  
        <div class="meme">
                    <div class="card">
                        <div class="info">
                            <p class="meme-title">${catalog.title}</p>
                            <img class="meme-image" alt="meme-img" src="${catalog.imageUrl}">
                        </div>
                        <div id="data-buttons">
                            <a class="button" href="/details/${catalog._id}">Details</a>
                        </div>
                    </div>
                </div>

        `
      )}
</div>
        </section>`;

export async function showCatalog(ctx) {
    const catalogs = await getAll();

    ctx.render(catalogTemplate(catalogs));
}
