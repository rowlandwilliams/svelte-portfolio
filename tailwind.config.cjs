const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [require('@tailwindcss/forms')],
	mode: 'jit',
	purge: {
		content: ['./src/**/*.{svelte,html}'],
		safelist: ['peer-checked:bg-yellow-400', 'peer-checked:bg-red-400']
	}
};
