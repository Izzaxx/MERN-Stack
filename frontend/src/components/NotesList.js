import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

function NotesList() {

    const [notes, setNotes] = useState([])

    const getNotes = async () => {
        const res = await axios.get('https://tasks-note.herokuapp.com/api/notes');
        setNotes(res.data);
    }

    const deleteNote = async (id) => {
        await axios.delete('https://tasks-note.herokuapp.com/api/notes/' + id);
        getNotes();
    }

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <div className="row">
            {
                notes.map(note => (
                    <div className="col-md-4 p-2" key={note._id}>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <h5>{note.title}</h5>
                                <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                                    Edit
                                </Link>
                            </div>
                            <div className="card-body">
                                <p>{note.description}</p>
                                <p>{note.author}</p>
                                <p>{format(note.date)}</p>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary" onClick={() => deleteNote(note._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default NotesList
