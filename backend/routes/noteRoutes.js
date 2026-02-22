const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// Add a new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({
      title,
      content
    });

    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
});

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});


// Delete note by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Note.findByIdAndDelete(id);

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
});

module.exports = router;