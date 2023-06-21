import axios from "axios"
import { useEffect, useState } from "react"

import { AiFillDelete, AiFillEdit } from "react-icons/ai"

// const baseUrl = 'http://localhost:4000/notes'

export default function Notes() {
    //   const { notes } = props   //object d-structure
    const [desc, setDesc] = useState('')
    const [notes, setNotes] = useState([])    // remove line 4 and use props.notes
    const [isEdit, setIsEdit] = useState(false)  // for update
    const [targetNote, setTargetNote] = useState({})  // handling update
    const [showAll, setShowAll] = useState(true)  //showall and showimp button
    const baseurl = ' http://localhost:4000/notes'

    useEffect(() => {
        axios.get(' http://localhost:4000/notes')
            .then(response => {
                console.log(response)
                setNotes(response.data)
            })
    }, [])



    //showall and showimp button
    const filteredNotes = showAll
        ? notes
        : notes.filter(n => n.important === true)


    const handleChange = (event) => {
        console.log(event.target.value)   //see on the console what you type on text field
        setDesc(event.target.value)
    }

    const handleAdd = (event) => {
        event.preventDefault()  //to stop send data on another server
        const newNote = {     //newNote is object
            id: notes.length + 1,
            desc: desc,
            important: Math.random() < 0.5

        }
        // console.log(newNote)
        axios.post(baseurl, newNote)
            .then(response => {
                console.log(response.data)
                setNotes(notes.concat(newNote))   //concat to send data after click add button to server(note)(list)
            })

        setDesc('')

    }


    const handleDelete = (noteId) => {
        if (window.confirm(`are you sure want to delete note with id ${noteId}`))

            axios.delete(`${baseurl}/${noteId}`)
                .then(response => {
                    console.log(response)
                    setNotes(notes.filter(n => n.id !== noteId))
                })



    }

    const handleEdit = (noteID) => {
        //    alert(noteID)
        const targetNote = notes.find(n => n.id === noteID)
        // console.log(notes.find(n =>n.id = noteID).desc)
        setDesc(targetNote.desc)
        setIsEdit(true)
        setTargetNote(targetNote)
    }

    const handleSave = (event) => {
        event.preventDefault()
        axios.put(`${baseurl}/${targetNote.id}`,
            { ...targetNote, desc: desc })
            .then(response => {
                console.log(response.data)
                const updatedNotes = notes.map(n => n.id === targetNote.id ?
                    { ...targetNote, desc: desc }
                    : n)
                setNotes(updatedNotes)
            })


        setIsEdit(false)
        setDesc('')
    }

    const handleImportant = () => {
        setShowAll(!showAll)
    }


    //css
    const h2style = {
        color: "blue",
        fontStyle: "italic",
        fontSize: 20
    }

    return (
        <>
            {/* <h1> Notes App</h1> */}
            <button onClick={handleImportant}>
                show {showAll ? "important" : 'all'}
            </button>


            {/* <ul>

                {

                    filteredNotes.map(note =>
                        <li key={note.id}>
                            {note.desc}
                            {' '}
                            <button onClick={() => handleDelete(note.id)}>delete</button>
                            <button onClick={() => handleEdit(note.id)}>edit</button>
                        </li>    // key={note.id }--> remove error from console of server
                    )

                }
            </ul> */}
            {/* <form>
                <input type="text" value={desc}
                    onChange={handleChange}
                />
                {' '}
                {
                    isEdit ?
                        <button onClick={handleSave}>save</button>
                        : <button onClick={handleAdd}>Add</button>
                }


            </form> */}

            {' '}

            {/* <button className="btn btn-primary" onClick={() => window.my_modal_5.showModal()}>Add</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <input type="text" value={desc}
                        onChange={handleChange}
                    />
                    {' '}
                    {
                        isEdit ?
                            <button onClick={handleSave}>save</button>
                            : <button onClick={handleAdd}>Add</button>
                    }
                    <div className="modal-action">
                        <button className="btn">Close</button>
                    </div>
                </form>
            </dialog> */}
    

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Notes</th>
                            <th>Action</th>
                        {/* //    <th>Important</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {filteredNotes.map(notes =>
                            <tr key={notes.id}>
                                <td>{notes.id}</td>
                                <td>{notes.desc}</td>
                                <td>
                                    <button onClick={(id) => handleDelete(notes.id)}>
                                        <AiFillDelete />
                                    </button>
                                    {' '}
                                    <button onClick={(id) => handleEdit(notes.id)}>
                                        <AiFillEdit />
                                    </button>
                                </td>

                            </tr>

                        )}


                    </tbody>
                </table>

                {/* Open the modal using ID.showModal() method */}
            <button className="btn btn-primary btn-block" onClick={() => window.my_modal_2.showModal()}>ADD</button>
            <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                    <input type="text" value={desc}
                        onChange={handleChange}
                    />
                     {' '}
                    {
                        isEdit ?
                            <button className="btn btn-primary" onClick={handleSave}>save</button>
                            : <button className="btn btn-secondary" onClick={handleAdd}>Add</button>
                    }
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            </div>


        </>
    )
}