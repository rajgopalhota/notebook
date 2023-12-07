import NoteContext from "./noteContext";
import { useState } from "react";
import axios from "axios";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await axios.get(`${host}/notes/fetchallnotes`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2ZjJlZDk2NDY3YTFiZDQ2M2I0NGJkIn0sImlhdCI6MTcwMTk0NjAxN30.Nm1mxQVr1t-tiHmbcAdurssZCmIZnZUNCTd10qAINv8",
      },
    });
    // const json = await response.json();
    console.log(response.data);
    setNotes(response.data);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call
    const response = await axios.post(
      `${host}/notes/addnote`,
      { title, description, tag },
      {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2ZjJlZDk2NDY3YTFiZDQ2M2I0NGJkIn0sImlhdCI6MTcwMTk0NjAxN30.Nm1mxQVr1t-tiHmbcAdurssZCmIZnZUNCTd10qAINv8",
        },
      }
    );
    console.log(response);
    const note = response.data;
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await axios.delete(`${host}/notes/deletenote/${id}`, {
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q",
      },
    });
    const data = response.data;
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await axios.put(`${host}/notes/updatenote/${id}`, {
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.data;

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
