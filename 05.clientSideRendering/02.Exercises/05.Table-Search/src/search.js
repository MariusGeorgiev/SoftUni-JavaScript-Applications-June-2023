const input = document.getElementById("searchField")

export function onSearch() {

const searchTerm = input.value.toLowerCase();
input.value = "";

const tableRows = document.querySelector('.container tbody').children;

for(let row of tableRows) {
    const rowContent = row.textContent.toLowerCase();

    row.classList.remove("select");

    if(rowContent.includes(searchTerm)) {
        row.classList.add("select");
    }
}

}