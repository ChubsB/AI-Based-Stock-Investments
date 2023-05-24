import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChartFill from '../assets/images/Chart_fill.png';
import Chart from '../assets/images/Chart.png';
import Chat from '../assets/images/Chat.png';
import User from '../assets/images/User.png';
import Control from '../assets/images/Control.png';
import Logo from '../assets/images/Logo.png';
import { FiUser, FiBell } from 'react-icons/fi';

const DashboardLayout = (props) => {
	const [tab, setTab] = useState('dashboard');
	const navigate = useNavigate();
	const [currentPath, setCurrentPath] = useState('/');
	const location = useLocation();
	const [open, setOpen] = useState(true);
	const Menus = [
		{ title: 'dashboard', src: ChartFill },
		{ title: 'market', src: Chat },
		{ title: 'stocks', src: Chart },
		{ title: 'portfolio', src: User },
	];

	useEffect(() => {
		if (location.pathname !== currentPath) {
			setCurrentPath(location.pathname);
		}
	}, [location.pathname, currentPath]);

	useEffect(() => {
		if (currentPath !== '/') {
			setTab(currentPath.substr(1).toLowerCase().replace('-', ' '));
		}
	}, [currentPath]);

	const handleMenuClick = (title) => {
		const newPath = `/${title.toLowerCase().replace(' ', '-')}`;
		if (newPath !== currentPath) {
			setCurrentPath(newPath);
			navigate(newPath);
		}
	};

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
							onClick={() => handleMenuClick(Menu.title)}
							key={index}
							className={`flex  rounded-md p-2 cursor-pointer hover:bg-primaryHover text-secondary text-sm items-center gap-x-4 transition-all ease-in duration-300
              ${Menu.gap ? 'mt-9' : 'mt-4'} ${
								tab == Menu.title && 'bg-primaryHover'
							} `}
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
						{tab}
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
