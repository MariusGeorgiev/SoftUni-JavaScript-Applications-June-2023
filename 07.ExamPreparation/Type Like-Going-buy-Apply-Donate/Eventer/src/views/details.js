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
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${details.imageUrl}" alt="example1" />
            <p id="details-title">${details.name}</p>
            <p id="details-category">
              Category: <span id="categories">${details.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${details.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${details.description}</span>
              </div>

            </div>

            <h3>Going: <span id="go">${totalCount}</span> times.</h3>

        <div id="action-buttons">

        ${(() => {
    if (isLoggedIn && isOwner) {
      return html`
            <a href="/edit/${details._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
            `
    } else { nothing }

  })()}
            ${(() => {
    if (isLoggedIn && !isOwner) {
      if(!didUserCount) {return html`
            <a href="javascript:void(0)" id="go-btn" @click=${onClickGo}>Going</a>
            `}
      
    }  else { nothing }

  })()}

              
            </div>
          </div>
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
    didUserCount = await bonusByUserId(eventId, userId);
  }

  const isOwner = user && details._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  totalCount = await bonusSingleTotalById(eventId);
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
    await bonusAllById(donation);

    totalCount = await bonusSingleTotalById(eventId);
    didUserCount = await bonusByUserId(eventId, userId);
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
