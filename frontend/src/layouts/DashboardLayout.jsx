import React, { useState } from 'react';
import ChartFill from '../assets/images/Chart_fill.png';
import Calendar from '../assets/images/Calendar.png';
import Chart from '../assets/images/Chart.png';
import Chat from '../assets/images/Chat.png';
import User from '../assets/images/User.png';
import Search from '../assets/images/Search.png';
import Folder from '../assets/images/Folder.png';
import Setting from '../assets/images/Setting.png';
import Control from '../assets/images/Control.png';
import Logo from '../assets/images/Logo.png';
import { FiUser, FiBell } from 'react-icons/fi';
import InfoBox from '../components/InfoBox';

const DashboardLayout = (props) => {
	const [open, setOpen] = useState(true);
	const Menus = [
		{ title: 'Dashboard', src: ChartFill },
		{ title: 'Inbox', src: Chat },
		{ title: 'Accounts', src: User, gap: true },
		{ title: 'Schedule ', src: Calendar },
		{ title: 'Search', src: Search },
		{ title: 'Analytics', src: Chart },
		{ title: 'Files ', src: Folder, gap: true },
		{ title: 'Setting', src: Setting },
	];
	return (
		<div className="flex">
			<div
				className={` ${
					open ? 'w-72' : 'w-20 '
				} bg-primary h-screen p-5  pt-8 relative duration-300`}
			>
				<img
					src={Control}
					className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && 'rotate-180'}`}
					onClick={() => setOpen(!open)}
				/>
				<div className="flex gap-x-4 items-center">
					<img
						src={Logo}
						className={`cursor-pointer duration-500 ${
							open && 'rotate-[360deg]'
						}`}
					/>
					<h1
						className={`font-inter text-white origin-left font-medium text-xl duration-200 ${
							!open && 'scale-0'
						}`}
					>
						Rupi Corp.
					</h1>
				</div>
				<ul className="pt-6">
					{Menus.map((Menu, index) => (
						<li
							key={index}
							className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? 'mt-9' : 'mt-2'} ${
								index === 0 && 'bg-light-white'
							} `}
						>
							<img src={Menu.src} />
							<span className={`${!open && 'hidden'} font-inter origin-left duration-200`}>
								{Menu.title}
							</span>
						</li>
					))}
				</ul>
			</div>
			<div className="h-screen w-full bg-secondary">
				<div className="flex items-center justify-between h-[10%] bg-secondayBackground shadow-md">
					<div className="ml-10 text-primary font-inter font-semibold text-3xl">
						Dashboard
					</div>
					<div className="flex justify-between items-center w-[5%] mr-10">
						<FiUser className="text-primary text-3xl" />
						<FiBell className="text-primary text-2xl" />
					</div>
				</div>
				{props.children}
			</div>
		</div>
	);
};

export default DashboardLayout;
