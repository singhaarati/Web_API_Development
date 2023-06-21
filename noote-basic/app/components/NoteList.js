import { useContext } from "react"
import notesContext from "../services/NotesContext"
import noteService from "../services/noteService"

export default function NoteList() {
    const { state: { notes, filter }, dispatch } = useContext(notesContext)
    const deleteNote = (noteId) => {
        // alert(noteId)
        noteService.deleteNote(noteId)
        .then(res => dispatch({
            type: 'SET_NOTES',
            payload: notes.filter(note => note.id !== noteId)
        }))
    }
    //const { filter } = useContext(notesContext)
    return (
        <div>
            <ul>
                {
                    notes.filter(note => note.desc.toLowerCase().includes(filter.toLowerCase()))
                        .map(note => (
                            <li key={note.id}>{note.desc}
                                {' '}
                                <button onClick={() => deleteNote(note.id)}>delete</button>
                                {' '}
                                <button>edit</button>

                            </li>
                        ))
                }
            </ul>
        </div>
    )
}
