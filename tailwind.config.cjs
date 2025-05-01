/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography"),require("daisyui")],
	daisyui: {
		// themes: true, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
		themes: [ 
			{
				mytheme: {      
						"primary": "#228dc5ff",	  
						// "secondary": "#995dc0ff",
						"secondary": "#AB7BCC",	  
						"accent": "#fb8500ff",
						"neutral": "#71cfe8ff",
						"base-100": "#DCF3F9",
						"info": "#1d1d1eff",
						"success": "#5bcb40",
						"warning": "#00ff00",
						"error": "#ff7477",
					},
				}
		],
		darkTheme: "dark", // name of one of the included themes for dark mode
		logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
	  }
}
