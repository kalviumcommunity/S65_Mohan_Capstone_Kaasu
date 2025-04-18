import React, { useEffect, useState } from 'react';
import useFamilyStore from '../stores/useFamilyStore';
import { 
  Users, 
  Plus, 
  LogOut, 
  Settings, 
  Clipboard, 
  AlertCircle, 
  DollarSign, 
  Home,
  X,
  UserPlus
} from 'lucide-react';
import { motion } from 'framer-motion';

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

const Dashboard = () => {
  const { family, getFamily } = useFamilyStore();
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    getFamily();
  }, [getFamily]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(family?.uniqueCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const totalBalance = family?.members?.reduce((acc, member) => acc + member.balance, 0) || 0;
  const totalExpenses = family?.members?.reduce((acc, member) => acc + member.expenses, 0) || 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{family?.name || 'Family Dashboard'}</h1>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full"
              >
                <Settings size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full"
              >
                <LogOut size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Family ID Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-5 mb-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-gray-700">Family ID</h2>
              <div className="flex items-center mt-1">
                <p className="font-mono text-lg text-indigo-600 font-medium">{family?.uniqueCode}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={copyToClipboard}
                  className="ml-2 p-1 text-gray-500 hover:text-indigo-600 rounded"
                >
                  {copySuccess ? <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-500"
                  >
                    ✓
                  </motion.span> : <Clipboard size={16} />}
                </motion.button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Share this ID to let others join your family</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-indigo-100 text-indigo-600 px-3 py-2 rounded-md flex items-center gap-1 text-sm font-medium hover:bg-indigo-200 transition-colors"
            >
              <UserPlus size={16} />
              Invite Members
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">Total Balance</h3>
              <DollarSign className="text-green-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-2">${totalBalance}</p>
            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="text-sm bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition-colors w-full flex items-center justify-center gap-1"
              >
                <Plus size={16} />
                Add Funds
              </motion.button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">Total Expenses</h3>
              <AlertCircle className="text-red-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-2">${totalExpenses}</p>
            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="text-sm bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-600 transition-colors w-full flex items-center justify-center gap-1"
              >
                <Plus size={16} />
                Track New Expense
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md mb-6 p-1"
        >
          <div className="flex">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-3 text-center font-medium text-sm rounded-md transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('members')}
              className={`flex-1 py-3 text-center font-medium text-sm rounded-md transition-colors ${
                activeTab === 'members' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              Members
            </button>
            <button 
              onClick={() => setActiveTab('transactions')}
              className={`flex-1 py-3 text-center font-medium text-sm rounded-md transition-colors ${
                activeTab === 'transactions' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              Transactions
            </button>
          </div>
        </motion.div>

        {/* Members List */}
        {activeTab === 'members' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-5"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Users size={20} />
                Family Members
              </h2>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="text-sm bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-600 transition-colors flex items-center gap-1"
              >
                <UserPlus size={16} />
                Add Member
              </motion.button>
            </div>
            
            <div className="overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 rounded-t-md grid grid-cols-3 gap-4 font-medium text-sm text-gray-500">
                <div>Name</div>
                <div>Balance</div>
                <div>Expenses</div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {(family && family.members) ? (
                  family.members.map((member, index) => (
                    <motion.div 
                      key={member._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-3 grid grid-cols-3 gap-4 hover:bg-gray-50"
                    >
                      <div className="font-medium text-gray-800">{member.name}</div>
                      <div className="text-green-600">${member.balance}</div>
                      <div className="text-red-600">${member.expenses}</div>
                    </motion.div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    No members found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-5"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Family Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-indigo-700">Total Members</h3>
                <p className="text-2xl font-bold text-indigo-900 mt-1">{family?.members?.length || 0}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-700">Average Balance</h3>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  ${family?.members?.length ? (totalBalance / family.members.length) : '0.00'}
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-red-700">Average Expenses</h3>
                <p className="text-2xl font-bold text-red-900 mt-1">
                  ${family?.members?.length ? (totalExpenses / family.members.length) : '0.00'}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors flex items-center gap-2"
              >
                <Settings size={18} />
                Manage Family Settings
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Transactions Tab Content */}
        {activeTab === 'transactions' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-5"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="text-sm bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-600 transition-colors flex items-center gap-1"
              >
                <Plus size={16} />
                Add Transaction
              </motion.button>
            </div>
            
            <div className="text-gray-500 text-center py-8">
              <p>No transactions to display</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-4 text-indigo-600 hover:text-indigo-800"
              >
                Create your first transaction
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

const CreateFamily = ({ setCreateFamilyPopup }) => {
  const { createFamily } = useFamilyStore();
  const [familyName, setFamilyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createFamily(familyName);
    setIsSubmitting(false);
    setCreateFamilyPopup(false);
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
          <h2 className="text-xl font-bold text-gray-800">Create New Family</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCreateFamilyPopup(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </motion.button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleCreate}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="familyName">
                Family Name
              </label>
              <input
                id="familyName"
                type="text"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter family name"
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
                {isSubmitting ? 'Creating...' : 'Create Family'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setCreateFamilyPopup(false)}
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

const JoinFamily = ({ setJoinFamilyPopup }) => {
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

const Family = ({ user }) => {
  const [createFamilyPopup, setCreateFamilyPopup] = useState(false);
  const [joinFamilyPopup, setJoinFamilyPopup] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {!user.familyId ? (
        <NotInFamily
          setJoinFamilyPopup={setJoinFamilyPopup}
          setCreateFamilyPopup={setCreateFamilyPopup}
        />
      ) : (
        <Dashboard />
      )}
      
      {createFamilyPopup && (
        <CreateFamily setCreateFamilyPopup={setCreateFamilyPopup} />
      )}
      
      {joinFamilyPopup && (
        <JoinFamily setJoinFamilyPopup={setJoinFamilyPopup} />
      )}
    </div>
  );
};

export default Family;

