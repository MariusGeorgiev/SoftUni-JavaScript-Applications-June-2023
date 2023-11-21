import { logout } from '../api/users.js';
import { html, page, render } from '../lib.js';
import { getUserData } from '../util.js';

const header = document.querySelector('header');

const navTemplate = (user) => html`
<h1><a href="/">Orphelp</a></h1>

    <nav>
        <div>
            <a href="/">Dashboard</a>
        </div>

        ${(() => {
    if (user) {
      return html`
            <div id="user">
                <a href="/profile">My Posts</a>
                  <a href="/create">Create Post</a>
                  <a @click=${onLogout} href="javascript:void(0)">Logout</a>
              </div>
            `
    } 
    if(!user) {
        return html`
            <div id="guest">
                  <a href="/login">Login</a>
                  <a href="/register">Register</a>
              </div>
            `
    }

  })()}

    </nav>
    `;

export function updateNav() {
    const user = getUserData();

    render(navTemplate(user), header);
}

async function onLogout() {
    await logout();

    updateNav();
    page.redirect('/');
}
