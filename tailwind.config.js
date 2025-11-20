/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Space Grotesk"', 'sans-serif'],
            },
            animation: {
                'card-enter': 'cardFadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                'spring': 'springUp 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards',
            },
            keyframes: {
                cardFadeIn: {
                    '0%': { transform: 'translateY(30px) scale(0.95)', opacity: '0' },
                    '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
                },
                springUp: {
                    '0%': { transform: 'translateY(120%) rotate(0deg)', opacity: '0' },
                    '60%': { transform: 'translateY(-20px) rotate(var(--rotation-end))', opacity: '1' },
                    '80%': { transform: 'translateY(10px) rotate(var(--rotation-end))' },
                    '100%': { transform: 'translateY(0) rotate(var(--rotation-end))', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
