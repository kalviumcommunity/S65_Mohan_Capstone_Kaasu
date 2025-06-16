import React, { useState } from 'react';

const Popup = ({heading, onCancel, onOk }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-100">
        <h1>{heading}</h1>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter text"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onOk(inputValue)}
            className="px-4 py-2 rounded-md bg-black text-white hover:bg-black"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
