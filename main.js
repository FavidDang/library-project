class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
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