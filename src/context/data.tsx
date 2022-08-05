import {
	createContext,
	Dispatch,
	ReactNode,
	useContext,
	useReducer,
} from 'react';
import { useLocalData } from '../hooks/useLocalData';
import { File, Folder } from '../types';

type DataType = {
	file: File | null;
	folders: Folder[];
};

type DataAction =
	| { type: 'CREATE_FOLDER'; data: Folder }
	| { type: 'REMOVED_FOLDER'; data: Folder }
	| { type: 'ADD_FILE_TO_FOLDER'; data: { file: File; folderId: string } }
	| { type: 'REMOVE_FILE'; data: File }
	| { type: 'SELECT_FILE'; data: File | null }
	| { type: 'SET_CONTENT'; data: { file: File; content: string } }
	| { type: 'SET_TAGS'; data: { file: File; tags: string[] } }
	| { type: 'SAVE_DATA' };

const initialState: DataType = {
	file: null,
	folders: [],
};

const reducer = (state: DataType, action: DataAction) => {
	switch (action.type) {
		case 'CREATE_FOLDER':
			return {
				...state,
				folders: [...state.folders, action.data],
			};
		case 'REMOVED_FOLDER':
			return {
				...state,
				folders: state.folders.filter(
					(folder) => folder.id !== action.data.id
				),
			};
		case 'ADD_FILE_TO_FOLDER':
			return {
				...state,
				folders: state.folders.map((folder) => {
					if (folder.id === action.data.folderId) {
						return {
							...folder,
							files: [
								...folder.files,
								{
									...action.data.file,
									folderId: action.data.folderId,
								},
							],
						};
					} else if (folder.id === action.data.file.folderId) {
						return {
							...folder,
							files: folder.files.filter(
								(file) => file.id !== action.data.file.id
							),
						};
					}
					return folder;
				}),
			};
		case 'REMOVE_FILE':
			return {
				...state,
				folders: state.folders.map((folder) => {
					if (folder.id === action.data.folderId) {
						return {
							...folder,
							files: [
								...folder.files.filter(
									(file) => file.id !== action.data.id
								),
							],
						};
					}
					return folder;
				}),
			};
		case 'SELECT_FILE':
			return { ...state, file: action.data };
		case 'SET_CONTENT':
			return {
				...state,
				folders: state.folders.map((folder) => {
					if (folder.id === action.data.file.folderId) {
						return {
							...folder,
							files: folder.files.map((file) => {
								if (file.id === action.data.file.id)
									file.content = action.data.content;

								return file;
							}),
						};
					}
					return folder;
				}),
			};
		case 'SET_TAGS':
			return {
				...state,
				folders: state.folders.map((folder) => {
					if (folder.id === action.data.file.folderId) {
						return {
							...folder,
							files: folder.files.map((file) => {
								if (file.id === action.data.file.id)
									file.tags = action.data.tags;

								return file;
							}),
						};
					}
					return folder;
				}),
			};
		case 'SAVE_DATA':
			localStorage.setItem('files', JSON.stringify(state.folders));
			return state;
		default:
			return state;
	}
};

const DataContext = createContext<{
	state: DataType;
	dispatch: Dispatch<DataAction>;
}>({ state: initialState, dispatch: () => {} });

interface Props {
	children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
	const { data } = useLocalData();
	const [state, dispatch] = useReducer(reducer, {
		file: null,
		folders: data,
	});

	return (
		<DataContext.Provider value={{ state, dispatch }}>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => {
	return useContext(DataContext);
};
