import { logout } from '../api/users.js';
import { html, page, render } from '../lib.js';
import { getUserData } from '../util.js';

const nav = document.querySelector('nav');

const navTemplate = (user) => html`

      
<a href="/catalog">All Memes</a>
        ${user
            ? html`
            <div class="user">
                <a href="/create">Create Meme</a>
                <div class="profile">
                    <span>Welcome, ${user.email}</span>
                    <a href="/profile">My Profile</a>
                    <a @click=${onLogout} href="javascript:void(0)">Logout</a>
                </div>
            </div>
            `
            : html`
            <div class="guest">
            <div class="profile">
                  <a href="/login">Login</a>
                  <a href="/register">Register</a>
              </div>
              <a class="active" href="/">Home Page</a>
              </div>
              `}
    `;

export function updateNav() {
    const user = getUserData();

    render(navTemplate(user), nav);
}

async function onLogout() {
    await logout();

    updateNav();
    page.redirect('/');
}

