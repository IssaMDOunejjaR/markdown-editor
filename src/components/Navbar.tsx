import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { File, Folder } from '../types';

export default function Navbar() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const html = window.document.documentElement;

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (mode: string) => {
		if (mode === 'light') html.classList.remove('dark');
		else if (mode === 'dark') html.classList.add('dark');
		setAnchorEl(null);
	};

	return (
		<div className='flex items-center p-4 border-b-[1px] dark:bg-darkPrimary'>
			<div className='flex items-center'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg'
					alt='Markdown'
					className='w-10 h-10 mr-2 dark:invert'
				/>
				<h1 className='text-2xl font-bold'>Markdown Editor</h1>
			</div>
			<div className='ml-auto'>
				<IconButton onClick={handleClick}>
					<SettingsIcon />
				</IconButton>
				<Menu
					id='basic-menu'
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
				>
					<MenuItem onClick={() => handleClose('light')}>
						Default Preview
					</MenuItem>
					<MenuItem onClick={() => handleClose('dark')}>
						Dark Mode
					</MenuItem>
				</Menu>
			</div>
		</div>
	);
}
