import { html } from '../lib.js';
import {  bonusUserProfile } from '../api/dataBonus.js'
import { getUserData } from '../util.js';


const profileTemplate = (postList, userData) => html`

      <section id="user-profile-page" class="user-profile">
      <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
                <div class="user-content">
                    <p>Username: ${userData.username}</p>
                    <p>Email: ${userData.email}</p>
                    <p>My memes count: ${postList.length}</p>
                </div>
            </article>
            
            

        ${postList.length === 0 
        ? 
        html`
            
        <p class="no-memes">No memes in database.</p>
        ` 
        : html`
<h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
            ${postList.map(meme => html `
            <div class="user-meme">
                    <p class="user-meme-title">${meme.title}</p>
                    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
                    <a class="button" href="/details/${meme._id}">Details</a>
                </div>
                </div>
            
            `)}  
            
        `} 
        
    </section>
`;

export async function profilePage(ctx) {
    const user = ctx.user._id
    const userData = getUserData();
    const postList = await bonusUserProfile(user);
    console.log(postList);

    ctx.render(profileTemplate(postList, userData));
}

