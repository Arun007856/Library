const Book = require("../models/book");

// Add a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    if (!title || !author || !year)
      return res.status(400).json({ error: "All fields are required." });

    const book = new Book({ title, author, year });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a book
exports.updateBookById = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) return res.status(404).json({ error: "Book not found" });

    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a book
exports.deleteBookById = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
