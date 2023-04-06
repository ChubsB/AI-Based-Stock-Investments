const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{js,jsx}', './public/index.html'],
	theme: {
		extend: {
			colors: {
				primary: '#18181b',
				primaryHover: '#3f3f46',
				secondary: '#e4e4e7',
				secondayBackground: "#f4f4f5",
				tertiary: "#6b7280",
			},
			fontFamily: {
				inter: ['Inter', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
