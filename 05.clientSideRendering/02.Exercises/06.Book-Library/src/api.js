const url = "http://localhost:3030/jsonstore/collections/books";

export function getAllBooks() {
  return fetch(url).then((res) => res.json());
}

export async function createBook(bookObj) {
  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bookObj),
  }).then((res) => res.json());
}

export function getBookById(id) {
  return fetch(`${url}/${id}`).then((res) => res.json());
}

export async function updateBook(id, bookObj) {
  const res = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bookObj),
  });
  return await res.json();
}

export function deleteBook(id) {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  });
}