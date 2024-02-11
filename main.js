class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index = -1;
    }

    info() {
        let read;
        if (this.read) {
            read = "read";
        } else {
            read = "not read yet"
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
    }
}

function toggleReadStatus(event) {
    const table = document.querySelector('table');
    const row = table.rows[event.target.index + 1];
    const readStatus = row.cells[3];
    if (myLibrary[event.target.index].read) {
        readStatus.innerHTML = "Not Read";
        event.target.style.backgroundColor = "red";
        myLibrary[event.target.index].read = false;
    } else {
        readStatus.innerHTML = "Read";
        event.target.style.backgroundColor = "green";
        myLibrary[event.target.index].read = true;
    }

}

function removeRow(event) {
    const table = document.querySelector('table');
    table.deleteRow(event.target.index + 1);
    myLibrary.splice(event.target.index, 1);

    for (let i = event.target.index + 1; i < table.rows.length; ++i) {
        --table.rows[i].cells[4].index;
        --table.rows[i].cells[5].index;
    }
}

function addBookToTable(book) {
    const table = document.querySelector('table');
    const row = table.insertRow();
    const title = row.insertCell();
    const author = row.insertCell();
    const pages = row.insertCell();
    const readStatus = row.insertCell();
    const toggleRead = row.insertCell();
    const remove = row.insertCell();

    if (book.read) {
        toggleRead.style.backgroundColor = 'green';
    } else {
        toggleRead.style.backgroundColor = 'red';
    }

    toggleRead.index = book.index;
    remove.index = book.index;

    title.innerHTML = book.title;
    author.innerHTML = book.author;
    pages.innerHTML = book.pages;
    remove.innerHTML = '&times;';
    readStatus.innerHTML = (book.read ? "Read" : "Not Read");

    toggleRead.addEventListener('click', toggleReadStatus);
    remove.addEventListener('click', removeRow);
}

function addBookToLibrary(lib, book) {
    if (book instanceof Book) {
        lib.push(book);
    }

    addBookToTable(book);
}

function displayLibrary(lib) {
    const table = document.querySelector("table");
    for (let i = 0; i < lib.length; ++i) {
        const book = lib[i];
        addBookToTable(book);
    }
    
}

function displayAddBook() {
    modal.style.display = 'block';
}

function removeAddBook() {
    form.reset();
    modal.style.display = 'none';
}

function newBook(event) {
    event.preventDefault();

    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read-status');

    const newBook = new Book(title.value, author.value, pages.value, read.checked);
    newBook.index = myLibrary.length;
    addBookToLibrary(myLibrary, newBook);
    form.reset();
    modal.style.display = 'none';
}

const myLibrary = [];

const button = document.querySelector('#add');
const modal = document.querySelector('.modal');
const form = document.querySelector('form');
const close = document.querySelector(".close");

button.addEventListener('click', displayAddBook);
close.addEventListener('click', removeAddBook);
form.addEventListener('submit', newBook);