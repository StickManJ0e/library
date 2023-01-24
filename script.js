let addBookMenuButton = document.querySelector(".add-book-menu-button");
let addBookForm = document.querySelector("#add-book-form");
let pageBody = document.querySelector("body");
let escapeMenuButton = document.querySelector('#escape-menu-button');
let submitFormButton = document.querySelector('#submit-form-button');
let myLibrary = [];
let mainContentDiv = document.querySelector('.main-content');
let readBook = document.querySelector('#read');

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

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary(author, title, pages, read) {
    let book = new Book(`${author}`, `${title}`, pages, read);
    myLibrary.push(book);
    createBookCard(book);
    console.log(myLibrary);
};

addBookForm.addEventListener('submit', (event) => {
    //Stop form from actually submitting and turning the data into an object
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.target).entries());
    let readStatus = data.read === 'on' ? true : false;
    addBookToLibrary(data.author, data.title, data.pages, readStatus);

    addRemoveClass(addBookForm, 'form-show', 'form-hidden');
    addRemoveClass(pageBody, 'blur-page', 'show-page');
    addBookForm.reset();
});

//Append multiple created elements at once to the same div
function appendMultiple(appendLocation, ...children) {
    children.forEach((child) => {
        appendLocation.appendChild(child);
    });
};

//Toggle the read/not read for books
function toggleRead(toggle, book) {
    toggle.addEventListener('click', () => {
        if (book.read === true) {
            addRemoveClass(toggle, 'read', 'not-read');
            book.read = false;
            return;
        }
        addRemoveClass(toggle, 'not-read', 'read');
        book.read = true;
        return;
    });
};

//Function to create simple book card element and append it 
function createBookElementAndAppend(elementType, className, objectKey, appendLocation) {
    let newElement = document.createElement(elementType);
    newElement.classList.add(className);
    newElement.textContent = objectKey;
    appendLocation.appendChild(newElement);
};

//element and classname to be written as strings
function createBookCard(book) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    mainContentDiv.appendChild(bookCard);

    createBookElementAndAppend("p", "book-title", book.title, bookCard);
    createBookElementAndAppend("p", "book-author", book.author, bookCard);
    createBookElementAndAppend("p", "book-pages", book.pages, bookCard);

    let bookRead = document.createElement("input");
    bookRead.setAttribute("type", "checkbox");
    bookRead.classList.add("book-read");
    let readToggle = book.read === true ? bookRead.classList.add("read") : bookRead.classList.add("not-read");

    bookCard.appendChild(bookRead);
    toggleRead(bookRead, book);
};


