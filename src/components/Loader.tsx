export default function Loader() {
	return (
		<div className='w-full h-full flex items-center justify-center'>
			<div className='relative w-20 h-20 flex items-center justify-center'>
				<span className='absolute w-full h-full rounded-full border-[6px] border-transparent border-t-primary animate-spin'></span>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg'
					alt='Markdown'
					className='w-10 h-10 dark:invert'
				/>
			</div>
		</div>
	);
}
