'use client'
import { useState } from "react"

export default function Counter(){
    const [count, setCount] = useState(0)
    const handleClick1 = () => {
        setCount(count + 1)
    }
    const handleClick2 = () => {
        setCount(count - 0)
        
    }
    const handleClick3 = () => {
        setCount(count - 1)
        
    }
    return(
        <div className="buttons">
            <p>{count}</p>
        <button style={{
          fontSize: '100%',
          position: 'relative',
          top: '20vh',
          marginRight: '5px',
          backgroundColor: 'brown',
          borderRadius: '8%',
          color: 'white',
        }}
        onClick={handleClick1}>Plus</button>
        <button style={{
          fontSize: '100%',
          position: 'relative',
          top: '20vh',
          marginLeft: '5px',
          backgroundColor: 'yellow',
          borderRadius: '8%',
          color: 'white',
        }}
          onClick={handleClick2}>Zero</button>
        <button style={{
          fontSize: '100%',
          position: 'relative',
          top: '20vh',
          marginLeft: '5px',
          backgroundColor: 'purple',
          borderRadius: '8%',
          color: 'white',
        }}
          onClick={handleClick3}>Minus</button>
      </div>




        // <div>
        //     <p>{count}</p>
        //     <button onClick={handleClick1}>plus</button>
        //     <button onClick={handleClick2}>Zero</button>
        //     <button onClick={handleClick3}>minus</button>
        // </div>



        
    )
}