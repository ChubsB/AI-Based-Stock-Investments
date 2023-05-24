const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{js,jsx}', './public/index.html'],
	theme: {
		extend: {
			colors: {
				primary: '#18181b',
				primaryHover: '#3f3f46',
				secondary: '#e4e4e7',
				secondayBackground: '#f4f4f5',
				tertiary: '#6b7280',
				success: '#02ec88',
				danger: '#e53529',
				info: '#0048ff',
				high: '#FFEA20',
				medium: '#98EECC',
				low: '#8DCBE6',
			},
			fontFamily: {
				inter: ['Inter', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	keyframes: {
		slideInRight: {
			'0%': { transform: 'translateX(100%)', opacity: 0 },
			'100%': { transform: 'translateX(0)', opacity: 1 },
		},
		slideOutRight: {
			'0%': { transform: 'translateX(0)', opacity: 1 },
			'100%': { transform: 'translateX(100%)', opacity: 0 },
		},
	},
	animation: {
		slideInRight: 'slideInRight 0.5s ease-in-out forwards',
		slideOutRight: 'slideOutRight 0.5s ease-in-out forwards',
	},
	plugins: [],
};
