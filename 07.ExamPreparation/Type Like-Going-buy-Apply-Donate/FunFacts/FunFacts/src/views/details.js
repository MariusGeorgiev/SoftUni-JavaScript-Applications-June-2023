import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteFactById,
  getFactById,
  getAllLikesByFactId,
  getAllLikesByFactIdAndUserId,
  likeFactById
} from "../api/data.js";

const detailsTemplate = (fact, isLogged, isOwner, onLike, hasLiked, totalLikes, onDelete) => html`<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${fact.imageUrl} alt="example1" />
        <p id="details-category">${fact.category}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p id="description">${fact.description}</p>
                <p id="more-info">${fact.moreInfo}</p>
            </div>

            <h3>Likes:<span id="likes">${totalLikes}</span></h3>
            <div id="action-buttons">
                ${isOwner
                    ? html`<a href="/edit/${fact._id}" id="edit-btn">Edit</a>
                          <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
                    : nothing}
                ${isLogged && !isOwner && !hasLiked
                    ? html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
                    : nothing}
            </div>
        </div>
    </div>
</section>`;


export async function showDetails(ctx) {
    const id = ctx.params.id;
    const isLogged = ctx.user;
    const [fact, totalLikes, hasLiked] = await Promise.all([getFactById(id), getAllLikesByFactId(id), getAllLikesByFactIdAndUserId(id, ctx.user?._id)]);
    const isOwner = ctx.user?._id == fact._ownerId;

    ctx.render(detailsTemplate(fact, isLogged, isOwner, onLike, hasLiked, totalLikes, onDelete));

    async function onLike() {
        await likeFactById(id);
        ctx.page.redirect('/details/' + id);
    }

    async function onDelete() {
        const choice = confirm('Are u sure?');

        if (choice) {
            await deleteFactById(id);
            ctx.page.redirect('/dashboard');
        }
    }
}



// export async function showDetails(ctx) {
//   // 1) render(template, container)
//   // or
//   // 2) ctx.render(template)

//   const factId = ctx.params.id;

//   // TODO:
//   // use Promise.all for album & likes requests

//   const fact = await getFactById(factId);

//   const likes = await getAllLikesByFactId(factId);

//   let isAlreadyLiked = false;

//   if (ctx.user) {
//     isAlreadyLiked = !!(await getAllLikesByFactIdAndUserId(
//       factId,
//       ctx.user._id
//     ));
//   }

//   ctx.render(
//     detailsTemplate(fact, likes, ctx.user, isAlreadyLiked, onDelete, onLike)
//   );

//   async function onLike() {
//     try {
//       likeFactById({ factId: fact._id });

//       ctx.page.redirect("/details/" + factId);
//     } catch (err) {
//       console.log(err.message);
//     }
//   }

//   async function onDelete() {
//     try {
//       await deleteFactById(factId);

//       ctx.page.redirect("/dashboard");
//     } catch (err) {
//       console.log(err.message);
//     }
//   }
// }


