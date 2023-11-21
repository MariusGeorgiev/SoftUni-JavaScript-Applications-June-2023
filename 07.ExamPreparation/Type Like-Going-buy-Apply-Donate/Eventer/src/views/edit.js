import { edit, getById } from '../api/data.js';
import { html } from '../lib.js';
// import { createSubmitHandler } from '../util.js';

const editTemplate = (editText, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                value="${editText.name}"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                value="${editText.imageUrl}"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                value="${editText.category}"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              >${editText.description}</textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              value="${editText.date}"
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>`;



export async function showEdit(ctx) {
    const eventId = ctx.params.id;
  
    const editText = await getById(eventId);
    ctx.render(editTemplate(editText, onSubmit));
  
    async function onSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
  
      const editT = {
        name: formData.get("name").trim(),
        imageUrl: formData.get("imageUrl").trim(),
        category: formData.get("category").trim(),
        description: formData.get("description").trim(),
        date: formData.get("date").trim(),
      };
  
      if (Object.values(editT).some((x) => !x)) {
        return alert("All fields are required!");
      }
  
      await edit(eventId, editT);
      event.target.reset();
      ctx.page.redirect(`/details/${eventId}`);
    }
  }