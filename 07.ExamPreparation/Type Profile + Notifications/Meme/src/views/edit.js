import { edit, getById } from '../api/data.js';
import { html } from '../lib.js';
import { showHideNotification } from '../util.js';

// import { createSubmitHandler } from '../util.js';

const editTemplate = (editText, onSubmit) => html`
<section id="edit-meme">
            <form id="edit-form" @submit=${onSubmit}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" .value=${editText.title} placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description">
                    ${editText.description} 
                        </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" .value=${editText.imageUrl}  placeholder="Enter Meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>

`;



export async function showEdit(ctx) {
    const eventId = ctx.params.id;
  
    const editText = await getById(eventId);
    ctx.render(editTemplate(editText, onSubmit));
  
    async function onSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
  
      const editT = {
        title: formData.get("title").trim(),
        description: formData.get("description").trim(),
        imageUrl: formData.get("imageUrl").trim(),
       
      };
  
      if (Object.values(editT).some((x) => !x)) {
        return showHideNotification("All fields are required!");
      }
  
      await edit(eventId, editT);
      event.target.reset();
      ctx.page.redirect(`/details/${eventId}`);
    }
  }