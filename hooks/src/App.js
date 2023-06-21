// import logo from './logo.svg';
import { useCallback, useMemo, useRef, useState } from 'react';
import './App.css';
import Notes from './Notes';

function SortedList({ list, sortFunc }) {
  console.log('rendering sorted list')
  const sortedNames = useMemo(() => {
    console.log('sorting names...')
    return [...list].sort(sortFunc)
  },
    [list, sortFunc])


  return (
    <div>
      {sortedNames.map(name => <li key={name}>{name}</li>)}
    </div>
  )
}

function App() {
  const [numbers] = useState([10, 20, 30])

  const [names, setNames] = useState(["Ram", "Sita", "Hari", "Gita"])

  const [count, setCount] = useState(0)
  const [name, setName] = useState(' ')

  const inputRef = useRef(null)

  const total = useMemo(() => {
    console.log('calculating total...')
    return numbers.reduce((acc, n) => acc + n, 0)
  }, [numbers])

  const sortFunc = useCallback((a, b) => a.localeCompare(b) * -1, [])

  const addName = () => {
    setNames(names.concat(inputRef.current.value))
    inputRef.current.value = " "
    // setName('')
  }

  return (
    <div className='App'>

      {/* <p>Total:{total}</p>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button> */}

      {/* <input type='text' ref={inputRef}
      // value={name}
      // onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addName}>Add Name</button>

      <SortedList list={names} sortFunc={sortFunc} /> */}

      <Notes/>
    </div>
  );
}

export default App;
