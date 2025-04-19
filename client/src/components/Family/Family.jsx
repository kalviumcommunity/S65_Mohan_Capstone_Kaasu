import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FamilyDashboard from './FamilyDashboard';
import CreateFamilyPopup from './CreateFamilyPopup';
import JoinFamilyPopup from './JoinFamilyPopup';
import NotInFamily from './NotInFamily';



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
        <FamilyDashboard />
      )}
      
      {createFamilyPopup && (
        <CreateFamilyPopup setCreateFamilyPopup={setCreateFamilyPopup} />
      )}
      
      {joinFamilyPopup && (
        <JoinFamilyPopup setJoinFamilyPopup={setJoinFamilyPopup} />
      )}
    </div>
  );
};

export default Family;

