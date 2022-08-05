import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Folder } from '../types';
import FileComponent from './File';
import { useData } from '../context/data';

interface Props {
	data: Folder;
}

export default function FolderComponent({ data }: Props) {
	const [showFiles, setShowFiles] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const { dispatch } = useData();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDeleteFolder = () => {
		dispatch({ type: 'REMOVED_FOLDER', data });
		dispatch({ type: 'SAVE_DATA' });
		setAnchorEl(null);
	};

	useEffect(() => {
		if (data.files.length === 0) {
			setShowFiles(false);
		}
	}, [data]);

	return (
		<div className='p-2'>
			<div className='flex items-center'>
				<FolderIcon className='!text-4xl !mr-2 !text-primary' />
				<div>
					<h2 className='text-sm font-semibold'>
						{data.name}
						{data.files.length > 0 && !showFiles && (
							<ExpandMoreIcon
								className='cursor-pointer'
								onClick={() => setShowFiles(true)}
							/>
						)}
						{data.files.length > 0 && showFiles && (
							<ExpandLessIcon
								className='cursor-pointer'
								onClick={() => setShowFiles(false)}
							/>
						)}
					</h2>
					<p className='text-xs italic font-light'>{`${data.files.length} Files`}</p>
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
						<MenuItem onClick={handleDeleteFolder}>Delete</MenuItem>
					</Menu>
				</div>
			</div>
			<div
				className={`pl-4 transition-all overflow-hidden ${
					showFiles ? 'h-fit' : 'h-0'
				}`}
			>
				<div className='py-0.5 border-l-[1px] border-gray-300 dark:border-white'>
					{data.files.map((file) => (
						<FileComponent key={file.id} data={file} />
					))}
				</div>
			</div>
		</div>
	);
}
