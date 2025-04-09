import React, { useState } from 'react'
import useFamilyStore from '../stores/useFamilyStore'
import { Cross } from 'lucide-react'

const NotInFamily = ({setCreateFamilyPopup}) => {
  
  return (
      <>
       <div className='bg-red w-full flex items-center flex-col gap-3 justify-center h-screen'>
       <h1>You Are Not in any Family</h1>
        <button className='btn bg-black border text-white p-2 rounded-md text-md'>Join Family</button>
        <button className='btn border-2 border-black text-black p-2 rounded-md text-md' onClick={() => setCreateFamilyPopup(true)}>Create Family</button>
       </div>
        </>
  )
}

const CreateFamily = ({setCreateFamilyPopup}) => {
  const {createFamily} = useFamilyStore()
  const [familyName, setFamilyName] = useState("")
  const handleCreate = async (e) => {
    e.preventDefault()
    await createFamily(familyName)
    setCreateFamilyPopup(false)
  }
  return (
    <>
      <div className='w-full h-screen bg-white absolute top-0  right-0 flex justify-center items-center'>
        <div className='flex flex-col gap-1 border p-5 rounded-lg'>
        <label className='text-xl font-bold '>Family Name</label>
        <input type="text" id="first_name" value={familyName} onChange={(e) => setFamilyName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Family Name" required />
        <div className="btns mt-5 ">
        <button type="button" onClick={() =>setCreateFamilyPopup(false)} class="w-full py-2.5 px-5 me-2 text-sm font-medium mb-2 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
        <button type="submit" onClick={handleCreate} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
        </div>
        </div>
      </div>
    </>
  )
}

const Family = ({user}) => {
  const [createFamilyPopup, setCreateFamilyPopup] = useState(false)
  return (
   
    <div>
       {!user.familyId && (
        <NotInFamily  setCreateFamilyPopup={setCreateFamilyPopup}/>
      ) }
      {createFamilyPopup && (<CreateFamily setCreateFamilyPopup={setCreateFamilyPopup}/>)}
    </div>
  )
}

export default Family