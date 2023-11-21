import { deleteItem, getById } from '../api/data.js';
import { html, nothing, page } from '../lib.js';
import { bonusAllById, bonusSingleTotalById, bonusByUserId } from '../api/dataBonus.js'


const detailsTamplate = (
  details,
  isOwner,
  onDelete,
  isLoggedIn,
  totalCount,
  onClickGo,
  didUserCount,
  
) => html`
<section id="meme-details">
            <h1>Meme Title: ${details.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${details.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                    ${details.description}
                    </p>

                    <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                    <${(() => {
    if (isLoggedIn && isOwner) {
      return html`
            <a href="/edit/${details._id}" class="button warning">Edit</a>
            <button href="javascript:void(0)" class="button danger" @click=${onDelete}>Delete</button>
            `
    } else { nothing }

  })()}

                    
                </div>
            </div>
        </section>

`;

export async function detailsPage(ctx) {
  const eventId = ctx.params.id;
  const details = await getById(eventId);
  const user = ctx.user;

  let userId;
  let totalCount;
  let didUserCount;

  if (user != null) {
    userId = user._id;
    // didUserCount = await bonusByUserId(eventId, userId);
  }

  const isOwner = user && details._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  // totalCount = await bonusSingleTotalById(eventId);
  ctx.render(detailsTamplate(
      details,
      isOwner,
      onDelete,
      isLoggedIn,
      totalCount,
      onClickGo,
      didUserCount,
    )
  );

  async function onClickGo() {
    const donation = {
       eventId,
    };
    // await bonusAllById(donation);

    // totalCount = await bonusSingleTotalById(eventId);
    // didUserCount = await bonusByUserId(eventId, userId);
    ctx.render(detailsTamplate(
        details,
        isOwner,
        onDelete,
        isLoggedIn,
        totalCount,
        onClickGo,
        bonusByUserId
      ));

      


  }

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteItem(eventId);
      ctx.page.redirect("/catalog");
    }
  }
}
