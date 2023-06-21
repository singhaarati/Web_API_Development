// import Image from 'next/image'

import Counter from "@/components/counter"



const Hello = (props) => {
  // console.log(props)
  const {name, age} = props
  return(
   <>
    <p>Hello {props.name}, you're {props.age} years old</p>
   </>
  )
}

export default function Home() {
  const now = new Date()
  // const name = 'ram'

  const friends = [
    {name:'ram', age: 20},
    {name:'sita', age: 21},
    {name:'hari', age: 18}
  ]
  return (
    <div>
      <h1>Welcome to react</h1>
      <p>It is {now.toString()}</p>
{/* 
      <Hello name={name} age={20}/> */}
      {
        friends.map(friend =>
          <Hello name={friend.name} age={friend.age}/>
          )
      }

      <Counter/>
      
    </div>
  )
}
