import { Modal } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useData } from '../context/data';
import FolderIcon from '@mui/icons-material/Folder';
import { File } from '../types';

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	file: File;
}

export default function AddToFolderModal({ open, setOpen, file }: Props) {
	const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
	const { state, dispatch } = useData();

	const handleCloseAddToFolder = () => {
		setOpen(false);
		setSelectedFolder(null);
	};

	const handleAddToFolder = () => {
		if (selectedFolder) {
			dispatch({
				type: 'ADD_FILE_TO_FOLDER',
				data: { file, folderId: selectedFolder },
			});
			dispatch({ type: 'SAVE_DATA' });
			setOpen(false);
			setSelectedFolder(null);
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleCloseAddToFolder}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
			className='flex justify-center items-center'
		>
			<div className='bg-white p-4 rounded-md text-center flex flex-col'>
				<h2 className='text-2xl font-bold'>Select Folder</h2>
				<div className='min-w-[40vw] h-[40vh] p-4 grid grid-cols-6 gap-4 overflow-y-auto'>
					{state.folders
						.filter(
							(folder) =>
								folder.id !== '000000' &&
								folder.id !== file.folderId
						)
						.map((folder) => (
							<div
								key={folder.id}
								className={`flex items-center space-x-2 p-4 rounded-md h-fit ${
									selectedFolder === folder.id
										? 'bg-slate-300'
										: 'bg-slate-100'
								} cursor-pointer`}
								onClick={() => setSelectedFolder(folder.id)}
							>
								<FolderIcon className='!text-4xl !text-primary' />
								<h3 className='text-lg font-semibold'>
									{folder.name}
								</h3>
							</div>
						))}
				</div>
				<button
					className='bg-primary p-2 rounded-md text-white uppercase'
					onClick={handleAddToFolder}
				>
					Add
				</button>
			</div>
		</Modal>
	);
}
