console.log('TODO:// Implement Home functionality');

function app() {
    
    const accessToken = sessionStorage.getItem("accessToken");
    const loggedUserEmail = sessionStorage.getItem("loggedUser");

    if(loggedUserEmail) {
        document.querySelector("span").textContent = loggedUserEmail;
    } else {
        document.querySelector("span").textContent = "guest"; 
    }

    if(accessToken) {
        document.getElementById("login").style.display = "none";
        document.getElementById("register").style.display = "none";

        document.getElementById("logout").style.display = "inline";
    } else {
        document.getElementById("login").style.display = "inline";
        document.getElementById("register").style.display = "inline";

        document.getElementById("logout").style.display = "none";
    }

    document.getElementById('logout').addEventListener('click', onLogout);

    async function onLogout() {
        await fetch("http://localhost:3030/users/logout", {
            method: "GET",
            headers: {
                'X-Authorization': accessToken,
            },
        });
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('loggedUser');
        sessionStorage.removeItem('id');

        window.location = "index.html";
    }

    document.getElementById
}
app();

//window.addEventListener("DOMContentLoaded", onLoad);