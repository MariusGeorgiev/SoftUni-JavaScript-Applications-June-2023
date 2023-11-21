const item = "user";

export function getUserData() {
    return JSON.parse(sessionStorage.getItem(item));
}

export function setUserData(data) {
    sessionStorage.setItem(item, JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.clear()
}


export function createSubmitHandler(callback) {
    return function (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        e.target.reset();

        callback(data);
    };
}

export function showHideNotification(mes) {
    const notificationContainer = document.querySelector(".notification");
    const notiFicationMessage = document.querySelector("#errorBox span");
    notificationContainer.style.display = "block";
    notiFicationMessage.textContent = mes;
    setTimeout(() => notificationContainer.style.display = "none", 3000);
}