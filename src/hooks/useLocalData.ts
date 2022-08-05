import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Folder } from '../types';

export const useLocalData = (): { data: Folder[] } => {
	const localData = localStorage.getItem('files');
	const [data] = useState<Folder[]>(() =>
		localData
			? JSON.parse(localData)
			: [{ id: '000000', name: uuidv4(), files: [] }]
	);

	useEffect(() => {
		if (!localData) localStorage.setItem('files', JSON.stringify(data));
	}, [data, localData]);

	return { data };
};
