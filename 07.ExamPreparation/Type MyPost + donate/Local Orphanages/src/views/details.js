import { deleteItem, getById } from '../api/data.js';
import { html, nothing } from '../lib.js';
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
<section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="${details.imageUrl}" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${details.title}</h2>
                        <p class="post-description">Description: ${details.description}</p>
                        <p class="post-address">Address: ${details.address}</p>
                        <p class="post-number">Phone number: ${details.phone}</p>


            <p class="donate-Item">Donate Materials: ${totalCount}</p>

            <div class="btns">

        ${(() => {
    if (isOwner && isLoggedIn) {
      return html`
            <a href="/edit/${details._id}" class="edit-btn btn">Edit</a>
            <a href="javascript:void(0)" class="delete-btn btn" @click=${onDelete}>Delete</a>
            `
    } else { nothing }

  })()}
            ${(() => {
    if (isLoggedIn && !isOwner) {
      if(didUserCount == 0) {return html`
            <a href="javascript:void(0)" class="donate-btn btn" @click=${onClickGo}>Donate</a>
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
  const postId = ctx.params.id;
  const details = await getById(postId);
  const user = ctx.user;

  let userId;
  let totalCount;
  let didUserCount;

  if (user != null) {
    userId = user._id;
    didUserCount = await bonusByUserId(postId, userId);
  }

  const isOwner = user && details._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  totalCount = await bonusSingleTotalById(postId);
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
        postId,
    };
    await bonusAllById(donation);

    totalCount = await bonusSingleTotalById(postId);
    didUserCount = await bonusByUserId(postId, userId);
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
      await deleteItem(postId);
      ctx.page.redirect("/");
    }
  }
}
