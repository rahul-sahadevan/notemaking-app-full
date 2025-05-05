import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaXmark } from 'react-icons/fa6'



const Note = () => {

    const [title,setTitle] = useState("")
    const [note,setNote] = useState("")
    const [allNote,setAllNote] = useState([])


    const fetchNotes = async()=>{

        try{

            const response = await axios.get("http://localhost:8000/get_notes")
            console.log(response)

            const result  =  response.data.data
            console.log(result)
            setAllNote(result)
            

        }
        catch(error){
            console.log(error)
        }

    }

    const handleNote = async()=>{

      try{

        const response = await axios.post("http://localhost:8000/add_note", {
          title,
          note,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log(response)
        if(response.status === 200){
          document.location.reload()
        }

      }
      catch(error){
        console.log(error)
      }

       

    }

    const handleDelete = async(title)=>{
      try{

        // console.log(allNote[index].title)
        const response = await axios.post("http://localhost:8000/delete_note", {
         title,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.status === 200){
          console.log(response)
          document.location.reload()
        }


      }


      catch(error){
        console.log(error)
      }
    }

    useEffect(()=>{
        fetchNotes()
        
    },[])
  return (
    <div className='container'>
        {/* form div */}
      <div className='form-div'>
        <input onChange={(e)=> setTitle(e.target.value)} type="text" placeholder='Title' />
        <textarea onChange={(e)=> setNote(e.target.value)} name="note" placeholder='Note'></textarea>
        <button onClick={handleNote}>Add Note</button>
      </div>
      {/* note displaiying div */}
      <div className='notes-div'>

        {
          allNote.map((note,index)=> (
            <div className='note-container'>
              <div className='delete-div'>
                <FaXmark className='delete-btn' onClick={() =>handleDelete(note.title)}/>
              </div>
                <div>
                    <h1>{note.title}</h1>
                    <br />
                    <p>{note.note}</p>

                </div>
            </div>
          ))  
        }
        
      </div>
    </div>
  )
}

export default Note
