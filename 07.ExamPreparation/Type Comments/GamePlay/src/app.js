import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { layoutTemplate} from "./views/navigation.js";
import { getUserData } from "./util.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/users.js";
import { detailsPage } from "./views/details.js";
import { dashBoardPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";
/*import { dashBoardPage } from "./views/dashboard.js";
import { createPage } from "./views/addPair.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { searchPage } from "./views/search.js";*/

const root = document.getElementById("box");

page(decorateContext);
page("/index.html", "/");
page("/", homePage);
page("/login", loginPage);
page("/register", registerPage);
page("/logout", logoutAction);
page("/dashboard", dashBoardPage);
page("/create-game", createPage);
page("/details/:id", detailsPage);
page("/edit/:id", editPage);/*
page("/search", searchPage);*/

page.start();

function decorateContext(ctx, next) {
    ctx.render = renderView;
    next();
}

function renderView(content) {
    const user = getUserData();
    render(layoutTemplate(user, content), root);
}

function logoutAction(ctx) {
    logout();
    ctx.page.redirect("/");
}