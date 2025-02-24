
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

let books = [];

app.get("/", (req, res) => {
    res.send("Library API is running!");
});
app.post("/books", (req, res) => {
    books.push(req.body);
    res.json({ message: "Book added!" });
});
app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.book_id == req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    Object.assign(book, req.body);
    res.json({ message: "Book updated!", book });
});
app.delete("/books/:id", (req, res) => {
    books = books.filter(b => b.book_id != req.params.id);
    res.json({ message: "Book deleted!" });
});
app.listen(port, () => {
    console.log(`Library API running at http://localhost:${port}`);
});