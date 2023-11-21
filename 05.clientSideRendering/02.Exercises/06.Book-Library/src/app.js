import { html, render } from "../node_modules/lit-html/lit-html.js";
import { mainTemplate } from "./templates/mainTemplate.js";
import { deleteBook, getAllBooks, updateBook } from "./api.js";
import { tableRowsTemplate } from "./templates/tableRowstemplate.js";

const documentBody = document.querySelector('body');
render(mainTemplate(), documentBody);

document.getElementById("loadBooks").addEventListener('click', async () => {
    const booksData = await getAllBooks();

    const tableBody = documentBody.querySelector("table tbody");

    const books = [];

    for(let id in booksData) {
        books.push({
            author: booksData[id].author,
            title: booksData[id].title,
            _id: id,
        });
    }

    const context = {
        books,
        deleteHandler,
        updateHandler,
    };

     render(tableRowsTemplate(context), tableBody)
});

function deleteHandler(id) {
    deleteBook(id);
    
    document.getElementById("loadBooks").click()
};

function updateHandler(id) {
    console.log("updateHandler...", id);

    //updateBook()


     //book = request => getBookById(id)
    // display form element (... style.dipsplay = "block")
    // render editFormTemplate(id, book)

}