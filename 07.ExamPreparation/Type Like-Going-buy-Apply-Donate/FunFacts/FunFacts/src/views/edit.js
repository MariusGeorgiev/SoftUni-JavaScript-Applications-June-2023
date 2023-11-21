import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getFactById, editFactById } from "../api/data.js";


const editTemplate = (fact, ctx) => html`
<section id="edit">
        <div class="form">
          <h2>Edit Fact</h2>
          <form class="edit-form" @submit=${e => onSubmit(e, ctx)}>
        
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              value=${fact.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              value=${fact.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
            value=${fact.description}
          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
            value=${fact.moreInfo}
          ></textarea>

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`;


export async function showEdit(ctx) {
  const id = ctx.params.id;
  const fact = await getFactById(id);

  render(editTemplate(fact, ctx), document.querySelector('main'));

}


async function onSubmit(event, ctx) {
  event.preventDefault();
  const id = ctx.params.id;


  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const fact = {
    category: formData.get('category').trim(),
    imageUrl: formData.get('image-url').trim(),
    description: formData.get('description').trim(),
    moreInfo: formData.get('additional-info').trim(),
  }

  if (fact.category == '' || fact.imageUrl == '' || fact.description == '' || fact.moreInfo == '') {
    return alert('All fields are required!');
  }

  await editFactById(id, fact);
  ctx.page.redirect('/details/' + id);


}


