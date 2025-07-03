import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { axiosInstance } from '../../utils/axiosInstance'
import Loading from './Loading'
import { Lightbulb } from 'lucide-react'

const Insights = () => {
  const [insightsLoading, setInsightsLoading] = useState(false)
  const [insights, setInsights] = useState('')

  const handleInsights = async () => {
    setInsightsLoading(true)
    try {
      const res = await axiosInstance.get('/transaction/insights')
      setInsights(res.data.insights)
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Failed to get Insights')
    } finally {
      setInsightsLoading(false)
    }
  }
  return (
    <div>
      {insightsLoading ? <Loading /> : (
        <div className='flex justify-center w-full items-center flex-col'>

          <button className='p-5 flex gap-2 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-md text-xl cursor-pointer' onClick={handleInsights}>
            <Lightbulb /> Get Insights {insights && "again"}
          </button>
          <div className=" bg-white rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: insights }} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Insights
