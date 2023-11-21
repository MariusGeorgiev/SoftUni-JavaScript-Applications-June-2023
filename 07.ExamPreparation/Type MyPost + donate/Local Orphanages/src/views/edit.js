import { edit, getById } from '../api/data.js';
import { html } from '../lib.js';
 //import { createSubmitHandler } from '../util.js';

const editTemplate = (editText, onSubmit) => html`
<section id="edit-page" class="auth">
            <form id="edit">
                <h1 @submit=${onSubmit} class="title">Edit Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title" value="${editText.title}"/>
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description" value="${editText.description}"/>
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl" value="${editText.imageUrl}"/>
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address" value="${editText.address}"/>
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone" value="${editText.phone}"/>
                </article>

                <input type="submit" class="btn submit" value="Edit Post">
            </form>
        </section>


               `;



export async function showEdit(ctx) {
    const id = ctx.params.id;
  
    const editText = await getById(id);
    ctx.render(editTemplate(editText, onSubmit));
  
    async function onSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
  
      const editText = {
        title: formData.get("title").trim(),
        description: formData.get("description").trim(),
        imageUrl: formData.get("imageUrl").trim(),
        address: formData.get("address").trim(),
        phone: formData.get("phone").trim(),
      };
  
      if (Object.values(editText).some((x) => !x)) {
        return alert("All fields are required!");
      }
  
      await edit(id, editText);
    //   event.target.reset();
      ctx.page.redirect('/details/' + id);
    }
  }