export default function Placeholder() {
	return (
		<div className='flex items-center justify-center flex-1'>
			<div className='flex flex-col items-center'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg'
					alt='Markdown'
					className='w-40 h-40 mr-4 dark:invert'
				/>
				<p>Select a file to edit or create a new one</p>
			</div>
		</div>
	);
}
