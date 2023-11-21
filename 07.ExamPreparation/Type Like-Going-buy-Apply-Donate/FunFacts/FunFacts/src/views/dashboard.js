import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllFacts } from "../api/data.js";

const dashboardTemplate = (facts) => html`
      <h2>Fun Facts</h2>
<section id="dashboard">
        ${facts.length !== 0 ? html`
        <div class="fact">
          ${facts.map(
            (f) => html`
            <img src="${f.imageUrl}" alt="example1" />
            <h3 class="category">${f.category}</h3>
            <p class="description">${f.description}</p>
            <a class="details-btn" href="/details/${f._id}">More Info</a>
          `
          )} 
        </div>
        ` : html `<h2>No Fun Facts yet.</h2>`}
</section>
`;

export async function showDashboard(ctx) {
    // 1) render(template, container)
    // or
    // 2) ctx.render(template)

    const facts = await getAllFacts();

    ctx.render(dashboardTemplate(facts))
}


    
        