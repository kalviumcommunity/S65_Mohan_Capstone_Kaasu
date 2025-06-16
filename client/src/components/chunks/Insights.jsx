import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { axiosInstance } from '../../utils/axiosInstance'
import Loading from './Loading'

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
        <div>
          <button className='p-5 bg-gray-800 text-white border text-xl cursor-pointer' onClick={handleInsights}>
            Get Insights
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
