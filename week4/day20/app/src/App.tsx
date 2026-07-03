import './App.css'
import React, { useState , useEffect } from 'react'
import { MdDelete } from "react-icons/md";


function App() {

  const [name,setName] = useState<string>("")
  const [item,setItem] = useState<string[]>([])

  useEffect(()=>{

    console.log("mounted component")

    const details = ["React","Vite"]

    setItem(details)

  },[])

  const handleSubmit = (event : React.FormEvent ) =>  {

    event.preventDefault()

    console.log("submited")
     if (!name.trim()) return;


    setItem([...item , name])
    setName("")

  }

const deleteValue = (index: number) => {
  alert("Do you want to delete")
  setItem(item.filter((_, i) => i !== index));
};
 
  return (
     <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[450px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Student List
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-3">

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="bg-blue-600 text-white px-5 rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>

        </form>

        <div className="mt-6">

          <h2 className="font-semibold mb-3">
            Students
          </h2>

          {item.map((item, index) => (
            <div
              key={index}
              className="border rounded-md p-3 mb-2 bg-gray-50"
            >
              <div className='flex items-center justify-between'>{item} <MdDelete onClick={() => deleteValue(index)}/></div>
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default App
