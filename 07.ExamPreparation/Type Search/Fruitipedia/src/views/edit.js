import { edit, getById } from '../api/data.js';
import { html } from '../lib.js';
// import { createSubmitHandler } from '../util.js';

const editTemplate = (fruit, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                value=${fruit.name}></textarea>
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                value=${fruit.imageUrl}></textarea>
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
                >${fruit.description}</textarea>
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
                >${fruit.nutrition}</textarea>
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>`;

// export async function showEdit(ctx) {
//     const id = ctx.params.id;
//     const fruit = await getById(id);

//     ctx.render(editTemplate(fruit, createSubmitHandler(onSubmit)));

//     async function onSubmit({ name, imageUrl, description, nutrition }) {
//         if ([name, imageUrl, description, nutrition].some((x) => x == '')) {
//             return alert('All fields are required!');
//         }

//         await edit(id, { name, imageUrl, description, nutrition });
//         ctx.page.redirect('/details/' + id);
//     }
// }



export async function showEdit(ctx) {
    const fruitId = ctx.params.id;
  
    const fruit = await getById(fruitId);
    ctx.render(editTemplate(fruit, onSubmit));
  
    async function onSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
  
      const editFruit = {
        name: formData.get("name").trim(),
        imageUrl: formData.get("imageUrl").trim(),
        description: formData.get("description").trim(),
        nutrition: formData.get("nutrition").trim(),
      };
  
      if (Object.values(editFruit).some((x) => !x)) {
        return alert("All fields are required!");
      }
  
      await edit(fruitId, editFruit);
      event.target.reset();
      ctx.page.redirect(`/details/${fruitId}`);
    }
  }