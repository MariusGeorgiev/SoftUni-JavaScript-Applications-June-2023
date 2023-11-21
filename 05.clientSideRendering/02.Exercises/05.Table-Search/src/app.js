import { render } from "../node_modules/lit-html/lit-html.js";
import { getAllStudents } from "./api.js";
import { studentsTemplate } from "./studentsTemplate.js";
import { onSearch } from "./search.js";

const tableBody = document.querySelector(".container tbody");

const studentData = await getAllStudents();

render(studentsTemplate(Object.values(studentData)), tableBody)

const searchButton = document.getElementById("searchBtn")
searchButton.addEventListener('click', onSearch)



