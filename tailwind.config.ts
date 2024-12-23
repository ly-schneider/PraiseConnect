import type {Config} from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	screens: {
  		nav: '835px',
            ...defaultTheme.screens
  	},
  	extend: {
  		colors: {
  			text: 'var(--text)',
  			background: 'var(--background)',
  			primary: 'var(--primary)',
  			primarySlanted: 'var(--primary-slanted)',
  			muted: 'var(--muted)',
  			success: 'var(--success)',
  			error: 'var(--error)',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'caret-blink': 'caret-blink 1.25s ease-out infinite',
  		},
  		fontFamily: {
  			mencken: 'var(--mencken)',
  			merriweather: 'var(--merriweather)'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
