import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";

function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updatenote } = props;

  const handleEditClick = () => {
    updatenote(note);
  };

  return (
    <div className="col-span-1">
      <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-gray-900">{note.title}</h2>
          <div className="flex space-x-2">
            <button
              className="text-gray-400 hover:text-gray-600"
              aria-label="Copy note"
            >
              <i className="fa-regular fa-copy"></i>
            </button>
            <button
              onClick={handleEditClick}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Edit note"
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Note Deleted Successfully", "danger");
              }}
              className="text-gray-400 hover:text-red-500"
              aria-label="Delete note"
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
        
        {note.tag && (
          <div className="flex items-center space-x-1 mb-2">
            <span className="text-xs text-gray-500">#{note.tag}</span>
          </div>
        )}
        
        <p className="text-sm text-gray-600">{note.description}</p>
      </div>
    </div>
  );
}

export default NoteItem;
