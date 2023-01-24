let addBookMenuButton = document.querySelector(".add-book-menu-button");
let addBookForm = document.querySelector("#add-book-form");
let pageBody = document.querySelector("body");
let escapeMenuButton = document.querySelector('#escape-menu-button');
let submitFormButton = document.querySelector('#submit-form-button');
let myLibrary = [];
let mainContentDiv = document.querySelector('.main-content');

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

function Book(author, title, pages) {
    this.author = author;
    this.title = title;
    this.pages = pages;
};

function addBookToLibrary(author, title, pages) {
    let book = new Book(`${author}`, `${title}`, pages);
    myLibrary.push(book);
    createBookDisplay(book);
    console.log(myLibrary);
};

addBookForm.addEventListener('submit', (event) => {
    //Stop form from actually submitting and turning the data into an object
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.target).entries());
    addBookToLibrary(data.author, data.title, data.pages);

    addRemoveClass(addBookForm, 'form-show', 'form-hidden');
    addRemoveClass(pageBody, 'blur-page', 'show-page');
    addBookForm.reset();
});

function appendMultiple(appendLocation, ...children) {
    children.forEach((child) => {
        appendLocation.appendChild(child);
    });
};


//element and classname to be written as strings
function createBookDisplay(book) {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book-div");

    let bookTitle = document.createElement("p");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;

    let bookAuthor = document.createElement("p");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = book.author;

    let bookPages = document.createElement("p");
    bookPages.classList.add("book-pages");
    bookPages.textContent = book.pages;

    mainContentDiv.appendChild(bookDiv);
    appendMultiple(bookDiv, bookTitle, bookAuthor, bookPages);

};



