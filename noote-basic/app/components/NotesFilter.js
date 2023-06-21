import { useContext } from 'react'
import notesContext from '../services/NotesContext'

export default function NotesFilter() {
    const { state: { filter }, dispatch } = useContext(notesContext)
    return (
        <div>
            <input type='text'
                value={filter}
                onChange={(e) => dispatch({
                    type: 'SET_FILTER',
                    payload: e.target.value
                })}
                placeholder='search notes ...'
            />
        </div>
    )
}
