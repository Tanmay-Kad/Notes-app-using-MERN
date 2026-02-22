import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get("https://notes-app-using-mern.onrender.com/api/notes");
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add note
  const addNote = async () => {
    if (!title || !content) return;

    try {
      await axios.post("https://notes-app-using-mern.onrender.com/api/notes", {
        title,
        content
      });

      setTitle("");
      setContent("");
      fetchNotes(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };


  const deleteNote = async (id) => {
  try {
    await axios.delete(`https://notes-app-using-mern.onrender.com/api/notes/${id}`);
    fetchNotes(); // refresh after delete
  } catch (error) {
    console.log(error);
  }
};

  return (
  <div className={`container ${darkMode ? "dark" : ""}`}>
    <h1>Notes App 🚀</h1>

    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>

    <div className="form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="add-btn" onClick={addNote}>
        Add Note
      </button>
    </div>

    {notes.map((note) => (
      <div key={note._id} className="note-card">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <button
          className="delete-btn"
          onClick={() => deleteNote(note._id)}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);
}

export default App;