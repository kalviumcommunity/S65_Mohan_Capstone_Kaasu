import React, { useState } from 'react';

const Main = () => {
  const nav = ["PDF Processing", "Real Time", "Secure"];
  const [currentItem, setCurrentItem] = useState(nav[0]);

  return (
    <div className='flex items-center justify-center min-h-screen p-4 bg-gray-50'>
      <div className="container w-full max-w-2xl p-5 rounded-lg shadow-lg bg-white border">
        <div className="head flex justify-between bg-gray-100 rounded-full p-2">
          {nav.map(el => (
            <a 
              key={el} 
              onClick={() => setCurrentItem(el)} 
              className={`cursor-pointer transition-all px-4 py-2 rounded-full text-sm lg:text-md font-semibold ${currentItem === el ? 'bg-white border border-gray-400 shadow-sm' : 'hover:bg-gray-200'}`}
            >
              {el}
            </a>
          ))}
        </div>
        <div className="body mt-5 rounded-md h-64 flex items-center justify-center bg-gray-100 text-lg font-semibold text-gray-700">
          {currentItem} Content
        </div>
      </div>
    </div>
  );
};

export default Main;
