import { getAll } from '../api/data.js';
import { html } from '../lib.js';

// this is dashboard also
const catalogTemplate = (catalogs) => html`
<section id="dashboard-page">
            <h1 class="title">All Posts</h1>
            <div class="all-posts">
  ${catalogs.length == 0
    ? html`<h1 class="title no-posts-title">No posts yet!</h1>`
    : catalogs.map((catalog) => html`  
                <div class="post">
                    <h2 class="post-title">${catalog.title}</h2>
                    <img class="post-image" src="${catalog.imageUrl}" alt="Material Image">
                    <div class="btn-wrapper">
                        <a href="/details/${catalog._id}" class="details-btn btn">Details</a>
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
