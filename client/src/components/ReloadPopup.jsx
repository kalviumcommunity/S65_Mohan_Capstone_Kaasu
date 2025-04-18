import React from 'react'
import {CircleArrowLeft, CircleCheck, CircleDotIcon} from 'lucide-react'
const ReloadPopup = ({setReloadPopup}) => {
    const handleReload = () => {
        setReloadPopup(false)
        location.reload()
    }
  return (
    <div className='flex min-h-screen justify-center items-center'>
        <button onClick={handleReload} className='bg-black text-white px-4 py-3 text-xl rounded-lg flex gap-2 items-center'> Reload <CircleDotIcon /></button>
    </div>
  )
}

export default ReloadPopup