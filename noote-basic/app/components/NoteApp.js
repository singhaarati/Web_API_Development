'use client'
import { useEffect, useReducer, useState } from 'react'
import notesContext from '../services/NotesContext'
import noteReducer from '../services/noteReducer'
import noteService from '../services/noteService'
import AddNote from './AddNote'
import NoteList from './NoteList'
import NotesFilter from './NotesFilter'

export default function NoteApp() {

    const [state, dispatch] = useReducer(noteReducer, {
        notes: [],
        desc: "",
        filter: ""
    })

    //state is mange through useReducer so it is not required

    // const [notes, setNotes] = useState([])
    // const [desc, setDesc] = useState("")
    // const [filter, setFilter] = useState("")

    useEffect(() => {

        noteService.getAllNotes()
            .then(data => dispatch({
                type: 'SET_NOTES',
                payload: data
            }))

        // .then(data => setNotes(data))

        // axios.get('http://localhost:3000/notes.json')
        //     .then(res => {
        //         console.log(res.data.notes)
        //         setNotes(res.data.notes)
        //     })
    }, [])

    

    return (
        <div>
            <notesContext.Provider value=
                {{
                    state,
                    dispatch

                    // notes,
                    // handleAdd,
                    // desc,
                    // setDesc,
                    // filter,
                    // setFilter
                }}>

                {/* <NotesFilter /> */}

                <NotesFilter />
                <NoteList />
                <br />
                <AddNote />


            </notesContext.Provider>
        </div>
    )
}



