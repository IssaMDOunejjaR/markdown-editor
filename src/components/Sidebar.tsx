import { IconButton, Menu, MenuItem } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useEffect, useState } from 'react';
import TagsInput from './TagsInput';
import CreateModal from './CreateModal';
import { useData } from '../context/data';
import FileComponent from './File';
import FolderComponent from './Folder';
import { File, Folder } from '../types';

interface SidebarHeaderProps {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	tags: string[];
	setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const SideBareHeader = ({
	searchValue,
	setSearchValue,
	tags,
	setTags,
}: SidebarHeaderProps) => {
	const [openCreate, setOpenCreate] = useState(false);
	const [type, setType] = useState<'folder' | 'file'>('folder');
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOptions = (type: 'folder' | 'file') => {
		setType(type);
		setAnchorEl(null);
		setOpenCreate(true);
	};

	return (
		<>
			<div className='sticky top-0 border-b-[1px]'>
				<div className='flex space-x-1 items-center'>
					<div className='flex-1 relative'>
						<SearchIcon className='absolute top-3.5 left-2.5 z-10 text-gray-500' />
						<input
							className='w-full bg-transparent p-3 pl-10 rounded-lg border-[1px] border-gray-200 focus:outline-none'
							placeholder='Search for a file or folder'
							value={searchValue}
							onChange={(e: any) =>
								setSearchValue(e.target.value)
							}
						/>
					</div>
					<div>
						<IconButton onClick={handleClick}>
							<AddCircleOutlineIcon />
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
							<MenuItem onClick={() => handleOptions('folder')}>
								New Folder
							</MenuItem>
							<MenuItem onClick={() => handleOptions('file')}>
								New File
							</MenuItem>
						</Menu>
					</div>
				</div>
				<div className='my-4'>
					<h3 className='text-sm mb-2 ml-2 text-gray-500'>
						Filter by tags :{' '}
						<span className='text-xs'>
							(press Enter to add tags)
						</span>
					</h3>
					<div>
						<TagsInput tags={tags} setTags={setTags} />
					</div>
				</div>
			</div>
			<CreateModal
				open={openCreate}
				setOpen={setOpenCreate}
				type={type}
			/>
		</>
	);
};

export default function Sidebar() {
	const {
		state: { folders },
	} = useData();
	const [searchValue, setSearchValue] = useState('');
	const [tags, setTags] = useState<string[]>([]);

	const [filesWithNoFolders, setFilesWithNoFolders] = useState<File[]>([]);
	const [allFolders, setAllFolders] = useState<Folder[]>([]);

	useEffect(() => {
		if (!searchValue && tags.length === 0) {
			setFilesWithNoFolders(
				folders.find((folder) => folder.id === '000000')?.files || []
			);
			setAllFolders(
				folders.filter((folder) => folder.id !== '000000') || []
			);
		} else {
			const defaultFolder = folders.find(
				(folder) => folder.id === '000000'
			);
			const foldersWithoutDefault = folders.filter(
				(folder) => folder.id !== '000000'
			);

			setFilesWithNoFolders(
				defaultFolder?.files.filter(
					(file) =>
						file.name.includes(searchValue) &&
						file.tags.filter((tag) => tags.find((t) => tag === t))
							.length
				) || []
			);

			setAllFolders(
				foldersWithoutDefault.filter(
					(folder) =>
						(tags.length === 0 &&
							folder.name.includes(searchValue)) ||
						folder.files.filter(
							(file) =>
								file.name.includes(searchValue) &&
								file.tags.filter((tag) =>
									tags.find((t) => tag === t)
								).length
						).length
				)
			);
		}
	}, [folders, searchValue, tags]);

	return (
		<div className='w-1/5 p-6 relative pt-8 border-r-[1px] h-full flex flex-col dark:bg-darkPrimary'>
			<IconButton className='!w-7 !h-7 !absolute -right-4 top-2 !bg-primary !text-white'>
				<ChevronLeftIcon />
			</IconButton>
			<SideBareHeader
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				tags={tags}
				setTags={setTags}
			/>
			<div className='py-2 overflow-y-auto h-[80%]'>
				{filesWithNoFolders?.map((file) => (
					<FileComponent key={file.id} data={file} />
				))}
				{allFolders.map((folder) => (
					<FolderComponent key={folder.id} data={folder} />
				))}
			</div>
		</div>
	);
}
