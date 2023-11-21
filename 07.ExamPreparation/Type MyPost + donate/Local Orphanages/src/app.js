import { page } from './lib.js';
import { render } from './lib.js';
import { getUserData } from './util.js';
import { loginPage, registerPage } from './views/auth.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { detailsPage } from './views/details.js';
import { showEdit } from './views/edit.js';
//import { showHome } from './views/home.js';
import { updateNav } from './views/navigation.js';
import { profilePage } from './views/profilePageInfo.js';
// import { showRegister } from './views/register.js';
// import { showLogin } from './views/login.js';
// import { searchPage } from './views/search.js';


//const main = document.querySelector('main');
const main = document.getElementById('main-content');

page(decorateContext);
//page('/', showHome);
page('/', showCatalog);
// page('/login', showLogin);
// page('/register', showRegister);
 page('/login', loginPage);
 page('/register', registerPage);
page('/create', showCreate);
page('/details/:id', detailsPage);
page('/edit/:id', showEdit);
page('/profile/', profilePage);
// page('/search', searchPage);


updateNav();
page.start();

// function decorateContext(ctx, next) {
//     ctx.render = renderMain;

//     const user = getUserData();

//     if (user) {
//         ctx.user = user;
//     }

//     next();
// }

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.setUserNav = updateNav;

    const user = getUserData();

    if (user) {
        ctx.user = user;
    }

    next();
}

function renderMain(content) {
    render(content, main);
}
