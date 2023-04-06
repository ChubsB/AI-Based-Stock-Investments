import React from 'react'

function InfoBox(props) {
  return (
	<div className='group flex flex-col bg-secondayBackground hover:bg-primary w-[20%] pb-8 pt-6 rounded shadow-md transition-all ease-in duration-300'>
		<div className='text-primary font-inter text-base font-light text-left ml-6 group-hover:text-secondary'>{props.title}</div>
		<div className='text-primary font-inter font-bold text-left ml-6 mt-2 text-2xl group-hover:text-secondary'>{props.value}</div>
	</div>
  )
}

export default InfoBox