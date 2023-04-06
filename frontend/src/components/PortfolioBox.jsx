import React from 'react'

function PortfolioBox(props) {
  return (
	<div className='group flex flex-col bg-primary hover:bg-secondary w-[30%] pb-8 pt-6 rounded shadow-md transition-all ease-in duration-300'>
		<div className='text-secondary font-inter text-base font-light text-left ml-6 group-hover:text-primary'>{props.title}</div>
		<div className='text-secondary font-inter font-bold text-left ml-6 mt-2 text-2xl group-hover:text-primary'>{props.value}</div>
		<div className='text-secondary font-inter font-light text-right mr-6 mt-8 text-sm group-hover:text-primary'>Monthly Return: <span className='text-secondary font-inter font-bold group-hover:text-primary'>{props.return}</span></div>
	</div>
  )
}

export default PortfolioBox