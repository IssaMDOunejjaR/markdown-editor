import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { IconButton } from '@mui/material';
import TagsInput from './TagsInput';
import { useEffect, useState } from 'react';
import { useData } from '../context/data';
import AddToFolderModal from './AddToFolderModal';

interface Props {
	showPreview: boolean;
	setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TextEditor({ showPreview, setShowPreview }: Props) {
	const {
		state: { file },
		dispatch,
	} = useData();
	const [tags, setTags] = useState<string[]>(file?.tags || []);
	const [openFolders, setOpenFolders] = useState(false);

	const handleDeleteFile = () => {
		if (file) {
			dispatch({ type: 'REMOVE_FILE', data: file });
			dispatch({ type: 'SAVE_DATA' });
			dispatch({ type: 'SELECT_FILE', data: null });
		}
	};

	const handleOnChange = (e: any) => {
		if (file) {
			dispatch({
				type: 'SET_CONTENT',
				data: { file, content: e.target.value },
			});
			dispatch({ type: 'SAVE_DATA' });
		}
	};

	useEffect(() => {
		if (file) {
			dispatch({
				type: 'SET_TAGS',
				data: { file, tags },
			});
			dispatch({ type: 'SAVE_DATA' });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tags, dispatch]);

	return (
		<>
			<div className='flex-1 flex flex-col dark:bg-darkPrimary'>
				<div className='p-8 pb-4 flex flex-1 items-center space-x-2'>
					<input
						className='w-full p-2 border-[1px] bg-transparent focus:outline-none'
						type='text'
						value={file?.name}
						onChange={(e: any) => {}}
					/>
					<div className='flex'>
						<IconButton onClick={handleDeleteFile}>
							<DeleteIcon />
						</IconButton>
						{!showPreview && (
							<IconButton onClick={() => setShowPreview(true)}>
								<VisibilityIcon />
							</IconButton>
						)}
						{showPreview && (
							<IconButton onClick={() => setShowPreview(false)}>
								<VisibilityOffIcon />
							</IconButton>
						)}
						<IconButton onClick={() => setOpenFolders(true)}>
							<CreateNewFolderIcon />
						</IconButton>
					</div>
				</div>
				<div className='px-8 pb-6 border-b'>
					<TagsInput tags={file?.tags || []} setTags={setTags} />
				</div>
				<div className='h-full'>
					<textarea
						name='editor'
						className='w-full h-full p-4 focus:outline-none bg-[#FAFAFA] dark:bg-[#1B2430]'
						value={file?.content}
						onChange={handleOnChange}
					></textarea>
				</div>
			</div>
			{file && (
				<AddToFolderModal
					open={openFolders}
					setOpen={setOpenFolders}
					file={file}
				/>
			)}
		</>
	);
}
