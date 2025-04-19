import { 
  Plus, 
  UserPlus
} from 'lucide-react';
import {motion} from 'framer-motion'

const NotInFamily = ({ setCreateFamilyPopup, setJoinFamilyPopup }) => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center flex-col gap-6 justify-center p-5"
      >
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Family Finance</h1>
          <p className="text-gray-600 mb-8">You are not currently in any family group</p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col gap-4 w-full max-w-md"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
            onClick={() => setJoinFamilyPopup(true)}
          >
            <UserPlus size={20} />
            <span className="font-medium">Join Existing Family</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 bg-white border-2 border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg shadow-sm hover:bg-indigo-50 transition-all"
            onClick={() => setCreateFamilyPopup(true)}
          >
            <Plus size={20} />
            <span className="font-medium">Create New Family</span>
          </motion.button>
        </motion.div>
      </motion.div>
    );
  };

  export default NotInFamily