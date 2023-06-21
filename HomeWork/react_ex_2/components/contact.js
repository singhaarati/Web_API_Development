
'use client'
import axios from "axios"
import { useEffect, useState } from "react"

export default function Contacts(props) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [contacts, setContacts] = useState([])
    const [isEdit, setIsEdit] = useState(false)  // for update
    const [targetContact, setTargetContact] = useState({})  // handling update
    const [search, setSearch] = useState(' ')

    const baseurl = ' http://localhost:4000/contacts'




    useEffect(() => {
        axios.get(' http://localhost:4000/contacts')
            .then(response => {
                console.log(response)
                setContacts(response.data)
            })
    }, [])
    const handleChange1 = (event) => {
        console.log(event.target.value)   //see on the console what you type on text field
        setName(event.target.value)
    }
    const handleChange2 = (event) => {
        console.log(event.target.value)   //see on the console what you type on text field
        setPhone(event.target.value)
    }
    const handleChangeSearch = (event) => {
        setSearch(event.target.value)
    }

    const handleAdd = (event) => {
        event.preventDefault()  //to stop send data on another server
        const newContact = {     //newNote is object
            id: contacts.length + 1,
            name: name,
            phone: phone
        }
        axios.post(baseurl, newContact)
            .then(response => {
                console.log(response.data)
                setContacts(contacts.concat(newContact))   //concat to send data after click add button to server(note)(list)

            })
        setName('')
        setPhone('')
    }
    const handleDelete = (contactId) => {
        if (window.confirm(`are you sure want to delete note with id ${contactId}`))
            axios.delete(`${baseurl}/${contactId}`)
                .then(response => {
                    console.log(response)
                    setContacts(contacts.filter(n => n.id !== contactId))
                })

    }


    const handleEdit = (contactId) => {
        //    alert(noteID)
        const targetContact = contacts.find(n => n.id === contactId)
        setName(targetContact.name)
        setPhone(targetContact.phone)
        setIsEdit(true)
        setTargetContact(targetContact)
    }
    const handleSave = (event) => {
        event.preventDefault()
        axios.put(`${baseurl}/${targetContact.id}`, 
        {...targetContact, name:name, phone:phone})
        .then (response =>{
            console.log(response.data)
            const updateContacts = contacts.map(n => n.id === targetContact.id ?
                {...targetContact, name:name, phone:phone}
                : n)
            setContacts(updateContacts)
        })
        
        setIsEdit(false)
        setName('')
        setPhone('')

    }


    const handleSearch = (contactId) => {

        // console.log(`hello`)

        // let found = false
        // let foundContact

        // Contacts.map((contacts) => {
        //     console.log(`${contacts.id}${contacts.name}${contacts.phone}`)
        //     if (contacts.id == search || contacts.name == search  || contacts.phone == search ) {
        //        found = true
        //        foundContact = contacts
        //     }
        // })

        // if(found){
        //     alert(foundContact.name)
        // }else{
        //     alert( `${search } Contact not found!`)
        // }

    }


    return (
        <>
            <h1>PhoneBook App</h1>

            <input
                type="search"
                placeholder="Search here"
                onChange={handleChangeSearch}
                value={search} />
                {' '}
            <button onClick={(search) => handleSearch(search)}>Search</button>
            <form>
                <label> Name </label>
                <input type="text" value={name}
                    onChange={handleChange1}></input>
                   
            </form>
            <form>
                <label > Phone Number </label>
                <input type="text" value={phone}
                    onChange={handleChange2}>

                </input>
                {' '}
                {
                    isEdit ?
                    <button style={{
                        fontSize: '100%',
                        top: '20vh',
                        marginRight: '5px',
                        backgroundColor: 'green',
                        borderRadius: '8%',
                        color: 'white',
                      }}
                    onClick={handleSave}>save</button>
                    : <button  style={{
                        fontSize: '100%',
                        top: '20vh',
                        marginRight: '5px',
                        backgroundColor: 'red',
                        borderRadius: '8%',
                        color: 'white',
                      }}
                     onClick={handleAdd}>Add</button>
                }
                

            </form>

         
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(c =>
                        <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>{c.phone}</td>
                            <td>
                                <button onClick={(id) => handleDelete(c.id)}>delete</button>
                                <button onClick={(id) => handleEdit(c.id)}>edit</button>
                            </td>

                        </tr>
                    )}
                </tbody>


            </table>
        </>
    )
}