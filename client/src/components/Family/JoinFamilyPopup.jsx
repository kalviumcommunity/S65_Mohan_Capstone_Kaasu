import { useState } from "react";
import useFamilyStore from "../../stores/useFamilyStore";
import { 
X
} from 'lucide-react';
import {motion} from 'framer-motion'
const JoinFamilyPopup = ({ setJoinFamilyPopup }) => {
    const { joinFamilyMember } = useFamilyStore();
    const [uniqueCode, setUniqueCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleJoin = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      await joinFamilyMember(uniqueCode);
      setIsSubmitting(false);
      setJoinFamilyPopup(false);
    };
  
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
        >
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Join Family</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setJoinFamilyPopup(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </motion.button>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleJoin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="familyCode">
                  Family Code
                </label>
                <input
                  id="familyCode"
                  type="text"
                  value={uniqueCode}
                  onChange={(e) => setUniqueCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter family unique code"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white font-medium rounded-md px-4 py-2 flex items-center justify-center transition-colors ${
                    isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isSubmitting ? 'Joining...' : 'Join Family'}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setJoinFamilyPopup(false)}
                  className="w-full bg-white border border-gray-300 text-gray-700 font-medium rounded-md px-4 py-2 hover:bg-gray-50"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  export default JoinFamilyPopup