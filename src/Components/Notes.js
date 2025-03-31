import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Noteitem from "./Noteitem";

function Notes(props) {
  const { notes = [], getNotes, editNote } = useContext(NoteContext);
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
}, [getNotes])

  const updatenote = (currentnote) => {
    ref.current.click();
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag || ""
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="notes-container p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <Noteitem 
  showAlert={props.showAlert} 
  key={note._id} 
  updatenote={updatenote} 
  note={note} 
/>

          ))
        ) : (
          <p className="text-gray-600">No notes available.</p>
        )}
      </div>

      {/* Hidden Modal Trigger */}
      <button
        ref={ref}
        type="button"
        className="hidden"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    rows="3"
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                type="button"
                disabled={note.edescription.length < 5 || note.etitle.length < 5}
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
