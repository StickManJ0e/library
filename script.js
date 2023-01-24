let addBookMenuButton = document.querySelector(".add-book-menu-button");
let addBookForm = document.querySelector("#add-book-form");
let pageBody = document.querySelector("body");
let escapeMenuButton = document.querySelector('#escape-menu-button');
let submitFormButton = document.querySelector('#submit-form-button');

//Shorthand function that removes and adds specific classes for an element
function addRemoveClass(element, removedClass, addedClass) {
    element.classList.remove(removedClass);
    element.classList.add(addedClass);
}

//Blurs the main page body and makes the book form appear
addBookMenuButton.addEventListener('click', () => {
    addRemoveClass(addBookForm, 'form-hidden', 'form-show');
    addRemoveClass(pageBody, 'show-page', 'blur-page');
});

//Escapes the form and makes the main page body clear
escapeMenuButton.addEventListener('click', () => {
    addRemoveClass(addBookForm, 'form-show', 'form-hidden');
    addRemoveClass(pageBody, 'blur-page', 'show-page');
    addBookForm.reset();
});

let myLibrary = [];

function Book(author, title, pages) {
    this.author = author;
    this.title = title;
    this.pages = pages;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log(myLibrary);
};

function createNewBook(author, title, pages) {
    let book = new Book(`${author}`, `${title}`, pages);
    addBookToLibrary(book);
};

addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.target).entries());
    createNewBook(data.author, data.title, data.pages);

    addRemoveClass(addBookForm, 'form-show', 'form-hidden');
    addRemoveClass(pageBody, 'blur-page', 'show-page');
    addBookForm.reset();
});

