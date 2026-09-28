/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'mary-purple': {
                    DEFAULT: '#7e22ce',
                    dark: '#6b21a8',
                    light: '#a855f7',
                },
                'mary-pink': {
                    DEFAULT: '#fbcfe8',
                    dark: '#f9a8d4',
                    light: '#fce7f3',
                },
            },
            fontFamily: {
                'cursive': ['"Dancing Script"', 'cursive'],
                'body': ['Quicksand', 'sans-serif'],
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
        },
    },
    plugins: [],
}
