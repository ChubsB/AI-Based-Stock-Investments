import React from 'react';
import PropTypes from 'prop-types';
import {GiBullHorns} from 'react-icons/gi'

function NewInfoBox({ title, value, width, Icon, isSelected, onClick }) {
	const widthPercentage = width ? `${width}%` : '100%';
	const titleToColorMap = {
		'High': 'hover:bg-high',
		'Medium': 'hover:bg-medium',
		'Low': 'hover:bg-low'
	};

	const bgColor = titleToColorMap[value] || 'hover:bg-secondayBackground';
	return (
		<div
			onClick={onClick}
			style={{ width: widthPercentage }}
			className={`group flex flex-col bg-secondayBackground ${bgColor} pb-8 pt-6 rounded shadow-md transition-all ease-in duration-300 ${isSelected ? 'border-2 border-primary' : ''}`}
		>
			<div className="flex justify-between">
				<div className="flex flex-col">
					<div className="text-primary font-inter text-base font-light text-left ml-6 group-hover:text-primary">
						{title}
					</div>
					<div className="text-primary font-inter font-bold text-left ml-6 mt-2 text-2xl group-hover:text-primary">
						{value}
					</div>
				</div>
				{Icon ? <Icon className='text-7xl group-hover:text-primary mr-10' aria-label="Icon" /> : null}
			</div>
		</div>
	);
}

NewInfoBox.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	width: PropTypes.number,
	Icon: PropTypes.elementType,
};

NewInfoBox.defaultProps = {
	isSelected: false,
	onClick: () => {},
};

export default NewInfoBox;
