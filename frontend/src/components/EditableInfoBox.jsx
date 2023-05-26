import React from 'react';

function EditableInfoBox({ title, value, width, handleChange }) {
	const widthPercentage = width ? `${width}%` : '100%';
  return (
    <div style={{ width: widthPercentage }} className="mb-20 h-1/2 group flex flex-col bg-secondayBackground hover:bg-primary pb-8 pt-6 rounded shadow-md transition-all ease-in duration-300">
      <div className='text-primary font-inter text-base font-light text-left ml-6 group-hover:text-secondary'>{title}</div>
      <input 
        className='w-4/5 text-primary font-inter font-bold text-left ml-6 mt-2 text-2xl group-hover:text-primary' 
        value={value} 
        onChange={handleChange}
      />
    </div>
  );
}

export default EditableInfoBox;
