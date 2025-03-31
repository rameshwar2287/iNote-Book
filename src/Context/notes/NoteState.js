import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:9000"
  const notesinitial = []
  const [notes, setnotes] = useState(notesinitial);
  //add note
  const getNotes = async () => {
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json=await response.json()
    // console.log(json)
    setnotes(json);
  }
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      body: JSON.stringify({ title, description, tag }),
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
   
    const json=await response.json()
    console.log(json)
    setnotes(json);
  }
  // delete note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "PUT",
      
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json=await response.json()
    console.log(json)
    console.log(`deleting the note with id ${id}`)
    const newNotes = notes.filter((note) => note._id !== id)
    setnotes(newNotes);
  }
  //edit note

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/note/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      const newNotes = notes.map(note => {
        if (note._id === id) {
          return {
            ...note,
            title: title,
            description: description,
            tag: tag
          };
        }
        return note;
      });

      setnotes(newNotes);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  
  


  return (
    <NoteContext.Provider value={{ notes, addnote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
