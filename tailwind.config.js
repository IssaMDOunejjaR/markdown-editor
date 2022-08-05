/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#4D96FF',
				darkPrimary: '#130F25',
				darkSecondary: '',
			},
		},
	},
	plugins: [
		require('tailwind-scrollbar'),
		require('tailwind-scrollbar-hide'),
	],
};
