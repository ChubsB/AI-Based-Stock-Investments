import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import ChartFill from '../assets/images/Chart_fill.png';
import Chart from '../assets/images/Chart.png';
import Chat from '../assets/images/Chat.png';
import User from '../assets/images/User.png';
import Folder from '../assets/images/Folder.png';
import Setting from '../assets/images/Setting.png';
import Control from '../assets/images/Control.png';
import Logo from '../assets/images/Logo.png';
import { FiUser, FiBell } from 'react-icons/fi';

const DashboardLayout = (props) => {
	const [tab, setTab] = useState('Dashboard');
	const navigate = useNavigate();
	const [open, setOpen] = useState(true);
	const Menus = [
		{ title: 'Dashboard', src: ChartFill },
		{ title: 'Market', src: Chat },
		{ title: 'Stocks', src: Chart },
		{ title: 'Portfolio ', src: User },
		{ title: 'Theme ', src: Folder, gap: true },
		{ title: 'Settings', src: Setting },
	];
	return (
		<div className="flex min-h-screen h-full">
			<div
				className={` ${
					open ? 'w-72' : 'w-20 '
				} bg-primary p-5 pt-8 relative duration-300 h-screen sticky top-0`}
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
							onClick={() => {
								setTab(Menu.title)
								navigate("/"+ Menu.title)
							}}
							key={index}
							className={`flex  rounded-md p-2 cursor-pointer hover:bg-primaryHover text-secondary text-sm items-center gap-x-4 transition-all ease-in duration-300
              ${Menu.gap ? 'mt-9' : 'mt-4'} ${tab == Menu.title && 'bg-primaryHover'} `}
						>
							<img src={Menu.src} />
							<span
								className={`${
									!open && 'hidden'
								} font-inter origin-left duration-200`}
							>
								{Menu.title}
							</span>
						</li>
					))}
				</ul>
			</div>
			<div className="w-full h-screen bg-secondary overflow-y-scroll">
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
