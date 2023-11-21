// TODO:
// 1. load phonebook -> use fetch
// 2. show phonebook -> update html content
// 3. delete single entry -> use fetch (DELETE)
// - create btn elem with ID (update HTML)
// 4. create single entry -> use fetch (POST)

const baseURL = "http://localhost:3030/jsonstore/phonebook";

function attachEvents() {
    console.log('TODO...');

    document.getElementById("btnLoad").addEventListener('click', loadPhoneBook);
    
    document.getElementById("phonebook").addEventListener('click', deletePhone);

    document.getElementById("btnCreate").addEventListener('click', createPhone);
}

attachEvents();

async function loadPhoneBook() {

    const response = await fetch(baseURL);

    const data = await response.json()

    console.log("...data...", data);

    const phoneBookElem = document.getElementById("phonebook")
    phoneBookElem.innerHTML = "";

    Object.values(data).forEach(x => {
        const liElem = document.createElement('li');
        liElem.textContent = `${x.person}: ${x.phone}`
        
        const deleteBtnElem = document.createElement("button");
        deleteBtnElem.setAttribute('id', x._id);
        deleteBtnElem.textContent = "Delete";

        liElem.appendChild(deleteBtnElem);

        phoneBookElem.appendChild(liElem);
    });
}

async function deletePhone(e) {

    if(e.target.textContent !== "Delete") {
        return;
    }

console.log("...deletePhone...");

const currentPhoneId = e.target.id;

await fetch(`${baseURL}/${currentPhoneId}`, {
    method: "DELETE",
});

loadPhoneBook()
}

async function createPhone() {
    console.log("...createPhone...");

    const person = document.getElementById('person').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if(!person || !phone) {
        alert("Person and Phone fields are required!");
        return;
    }

    const requestData = JSON.stringify({
        person,
        phone
    })

    await fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: requestData,
    });

    document.getElementById('person').value = "";
    document.getElementById('phone').value = "";

    loadPhoneBook()
}