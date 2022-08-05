import { useData } from '../context/data';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import prettify from 'html-prettify';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import parse from 'html-react-parser';

export default function Preview() {
	const {
		state: { file },
	} = useData();

	return (
		<div className='flex-1 h-full border-l-[1px] dark:bg-darkPrimary'>
			<div className='p-4 border-b-[1px]'>
				<h2 className='text-2xl font-bold'>Preview</h2>
			</div>
			<div className='h-full'>
				<SyntaxHighlighter
					language='html'
					style={oneLight}
					className='!my-0 !h-full'
				>
					{prettify(
						DOMPurify.sanitize(marked.parse(file?.content || ''))
					)}
				</SyntaxHighlighter>
			</div>
		</div>
	);
}
