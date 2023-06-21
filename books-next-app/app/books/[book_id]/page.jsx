
'use client'

import { useRouter } from 'next/navigation'
import Router from 'next/router'

export default function page({params}) {
    // console.log(params)

    const  router = useRouter()

    const handleDelete = () => {
       router.push("/books")
    }

    console.log(params)
  return (
    <div>
      <p>This is book page for {params.book_id}</p>
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}
