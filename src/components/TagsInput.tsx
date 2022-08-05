import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
	tags: string[];
	setTags: Dispatch<SetStateAction<string[]>>;
}

export default function TagsInput({ tags, setTags }: Props) {
	const [value, setValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleRemoveTag = (name: string) => {
		setTags([...tags.filter((tag) => tag !== name)]);
	};

	useEffect(() => {
		const ref = inputRef;

		const handleKey = (e: KeyboardEvent) => {
			const val = value.trim();

			if (e.code === 'Enter' && val !== '') {
				if (!tags.includes(val)) {
					setTags([...tags, val]);
					setValue('');
				}
			} else if (e.code === 'Backspace') {
				if (value === '') {
					tags.pop();
					setTags([...tags]);
				}
			}
		};

		ref.current?.addEventListener('keydown', handleKey);

		return () => {
			ref.current?.removeEventListener('keydown', handleKey);
		};
	}, [setTags, tags, value]);

	return (
		<div className='flex p-2 rounded-lg space-x-1 flex-wrap border-[1px]'>
			{tags.map((tag, index) => (
				<span
					key={index}
					className='bg-slate-600 text-white py-1 px-2 rounded-md text-sm flex items-center my-1'
				>
					{tag}{' '}
					<CloseIcon
						className='!text-sm !ml-2 cursor-pointer'
						onClick={() => handleRemoveTag(tag)}
					/>
				</span>
			))}
			<input
				ref={inputRef}
				type='text'
				placeholder='Enter tag'
				className='w-20 bg-transparent p-1.5 flex-1 focus:outline-none'
				value={value}
				onChange={(e: any) => setValue(e.target.value)}
			/>
		</div>
	);
}
