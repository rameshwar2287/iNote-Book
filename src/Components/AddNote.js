import React, { useContext, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";

function AddNote(props) {
  const { addnote } = useContext(NoteContext);
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
    props.showAlert("Note Added Successfully", "success");
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-note-container p-4 rounded-lg shadow-md bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
      <h2 className="text-2xl font-bold text-white mb-4">Add Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="block text-white font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="block text-white font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            rows="3"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="block text-white font-semibold mb-2">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <button
          type="submit"
          disabled={note.description.length < 5 || note.title.length < 5}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNote;
