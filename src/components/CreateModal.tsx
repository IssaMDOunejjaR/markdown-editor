import { Modal } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useData } from '../context/data';
import { v4 as uuidv4 } from 'uuid';
import { File } from '../types';

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	type: 'folder' | 'file';
}

export default function CreateModal({ open, setOpen, type }: Props) {
	const [value, setValue] = useState('');

	const { dispatch } = useData();

	const handleCloseCreateFile = () => setOpen(false);

	const handleCreate = () => {
		const trimedValue = value.trim();

		if (type === 'folder' && trimedValue !== '') {
			dispatch({
				type: 'CREATE_FOLDER',
				data: { id: uuidv4(), name: trimedValue, files: [] },
			});
			dispatch({ type: 'SAVE_DATA' });

			setOpen(false);
		} else if (type === 'file' && trimedValue !== '') {
			console.log('create');
			const file: File = {
				id: uuidv4(),
				name: trimedValue,
				createdAt: Date.now(),
				content: '',
				folderId: '',
				tags: [],
			};

			dispatch({
				type: 'ADD_FILE_TO_FOLDER',
				data: { file, folderId: '000000' },
			});
			dispatch({ type: 'SAVE_DATA' });

			setOpen(false);
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleCloseCreateFile}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
			className='flex justify-center items-center'
		>
			<div className='bg-white p-4 rounded-md text-center flex flex-col'>
				<h2 className='text-2xl font-bold'>
					Create New {type === 'folder' ? 'Folder' : 'File'}
				</h2>
				<input
					type='text'
					placeholder='Name'
					className='p-2 border-[1px] rounded-md my-4'
					value={value}
					onChange={(e: any) => setValue(e.target.value)}
				/>
				<button
					className='bg-primary p-2 rounded-md text-white uppercase'
					onClick={handleCreate}
				>
					Create
				</button>
			</div>
		</Modal>
	);
}
