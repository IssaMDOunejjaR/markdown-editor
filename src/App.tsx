import { useState } from 'react';
import Navbar from './components/Navbar';
import Placeholder from './components/Placeholder';
import Preview from './components/Preview';
import Sidebar from './components/Sidebar';
import TextEditor from './components/TextEditor';
import { useData } from './context/data';

function App() {
	const [showPreview, setShowPreview] = useState(false);

	const { state } = useData();

	// console.log(state);

	return (
		<div className='h-screen flex flex-col'>
			<Navbar />
			<div className='h-full flex'>
				<Sidebar />
				{state.file ? (
					<TextEditor
						showPreview={showPreview}
						setShowPreview={setShowPreview}
					/>
				) : (
					<Placeholder />
				)}
				{state.file && showPreview && <Preview />}
			</div>
		</div>
	);
}

export default App;
