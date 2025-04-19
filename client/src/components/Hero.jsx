import { Plus } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Hero = ({user, setReloadPopup}) => {
  const fileRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleUpload = async (e) => {
    try {
      if(user) {
        
        setLoading(true)
        const dataForm = new FormData()
        dataForm.append('file', e.target.files[0])
        let res = await axiosInstance.post('/transaction/upload', dataForm )
        console.log(res)
      }
      else{
        navigate('/login')
      }
    } catch (error) {
      console.log(error.message)
    }
    finally{
      setLoading(false)
      navigate('/dashboard')
      setReloadPopup(true)
    }
  }
  const handleClick = () => {
    if(!user){
      navigate('/login')
    }
  }
  return (
    <div>

       <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-evenly min-h-screen p-6 relative overflow-hidden">
         <motion.img 
       animate={isHovered ? { x: 30, y: -10 } : { x: 50, y: 20 }}
       className='absolute top-10 left-5 w-16 md:w-24 lg:w-32' 
       src="/images/curve-1.png" 
       alt="Curve 1"
     />
     <motion.img 
       animate={isHovered ? { x: -30, y: 10 } : { x: -50, y: -20 }}
       className='absolute bottom-10 right-5 w-16 md:w-24 lg:w-32' 
       src="/images/curve-2.png" 
       alt="Curve 2"
     />

     
     <div className="flex flex-col items-center text-center lg:text-left lg:items-start space-y-5 max-w-lg">
       <img className="w-64 md:w-48 lg:w-full" src="/images/bank-person.png" alt="Bank Person" />
       <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900'>
         Upload Your <span className='bg-green-500 px-3 py-1 rounded-lg text-white'>Bank Statement</span>
       </h2>
       <p className='text-base md:text-lg text-gray-700'>
         <span className='bg-blue-500 px-3 py-1 rounded-lg font-bold text-white'>AI</span> Based Processing
       </p>
     </div>

     <div className="upload mt-6 lg:mt-0" onClick={handleClick}>
       <input className='hidden' type="file" accept="application/pdf" ref={fileRef} onChange={handleUpload}/>
       <motion.div 
         className="upload-container cursor-pointer border-4 border-green-600 border-dashed p-8 md:p-12 flex flex-col items-center justify-center rounded-lg bg-white shadow-lg w-60 md:w-72 lg:w-80 text-center"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         onClick={() => user && fileRef.current.click()}
         whileHover={{ scale: 1.05 }}
       >
         <Plus size={40} className="text-green-600" />
         <h2 className='text-lg md:text-xl font-semibold text-gray-800'>Upload Your PDF</h2>
         <p className='text-gray-600 text-sm md:text-base'>or Drag and Drop</p>
       </motion.div>
      </div>
      </div>

{loading && <div role="status" className='top-0 right-0 flex-col gap-2 bg-gray-50 absolute w-screen h-screen flex justify-center items-center z-10'>
    {/* <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <p>Processing</p> */}
    <Loader />
    <span className="sr-only">Loading...</span>
</div>}

     </div>
  );
};

export default Hero;