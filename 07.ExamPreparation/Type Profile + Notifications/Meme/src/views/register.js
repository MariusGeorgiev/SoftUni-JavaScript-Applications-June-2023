import { register } from '../api/users.js';
import { html } from '../lib.js';
import { createSubmitHandler, showHideNotification } from '../util.js';


const registerTemplate = (onSubmit) => html`
<section id="register">
            <form id="register-form" @submit=${onSubmit}>
                <div class="container">
                    <h1>Register</h1>
                    <label for="username">Username</label>
                    <input id="username" type="text" placeholder="Enter Username" name="username">
                    <label for="email">Email</label>
                    <input id="email" type="text" placeholder="Enter Email" name="email">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <label for="repeatPass">Repeat Password</label>
                    <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                    <div class="gender">
                        <input type="radio" name="gender" id="female" value="female">
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="male" value="male" checked>
                        <label for="male">Male</label>
                    </div>
                    <input type="submit" class="registerbtn button" value="Register">
                    <div class="container signin">
                        <p>Already have an account?<a href="/login">Sign in</a>.</p>
                    </div>
                </div>
            </form>
        </section>

`;

export function showRegister(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onSubmit)));

  async function onSubmit({ email, password,  repeatPass }) {
      if (email == '' || password == '') {
          return showHideNotification('All fields are required!');
      }

      if (password != repeatPass) {
          return showHideNotification("Passwords don't match!");
      }

      await register(email, password);
      ctx.page.redirect('/');
  }
}