import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useData } from '../context/data';
import { File } from '../types';
import AddToFolderModal from './AddToFolderModal';

interface Props {
	data: File;
}

export default function FileComponent({ data }: Props) {
	const [openFolders, setOpenFolders] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const { dispatch } = useData();

	const date = new Date(data.createdAt);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDeleteFile = () => {
		dispatch({ type: 'REMOVE_FILE', data });
		dispatch({ type: 'SAVE_DATA' });
		setAnchorEl(null);
	};

	const handleAddToFolder = () => {
		setOpenFolders(true);
		setAnchorEl(null);
	};

	const handleSelectFile = () => {
		dispatch({ type: 'SELECT_FILE', data });
	};

	return (
		<>
			<div className='flex items-center cursor-pointer hover:bg-slate-100 p-2'>
				<div onClick={handleSelectFile} className='flex flex-1'>
					<InsertDriveFileIcon className='!text-4xl !mr-2 !text-primary' />
					<div>
						<h2 className='text-sm font-semibold'>{data.name}</h2>
						<p className='text-xs italic font-light'>
							{`Created ${date.getDate()} ${date.toLocaleString(
								'default',
								{
									month: 'long',
								}
							)} ${date.getFullYear()}`}
						</p>
					</div>
				</div>
				<div className='ml-auto'>
					<IconButton onClick={handleClick}>
						<MoreVertIcon />
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
						<MenuItem onClick={handleDeleteFile}>Delete</MenuItem>
						<MenuItem onClick={handleAddToFolder}>
							Add to folder
						</MenuItem>
					</Menu>
				</div>
			</div>
			<AddToFolderModal
				open={openFolders}
				setOpen={setOpenFolders}
				file={data}
			/>
		</>
	);
}
