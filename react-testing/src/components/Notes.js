import React, { useEffect, useState } from 'react'

export default function Notes({ handleDelete }) {
    const [notes, setNotes] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(data => setNotes(data))
            .catch(err => setError('error fetching data'))
    }, [])
    return (
        <div>
            <h1>List of notes</h1>
            {error
                ? <p>{error}</p>
                : <ul>
                    {
                        notes.map(note => (
                            <li key={note.id}>
                                {note.title}
                                {' '}
                                <button onClick={handleDelete}>delete</button>
                            </li>
                        ))
                    }
                </ul>
            }


        </div>
    )
}
