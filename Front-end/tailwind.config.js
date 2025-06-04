// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Đảm bảo tên 'Fraunces' khớp với tên từ Google Fonts
        sans: ['Fraunces', 'serif'],
      },
    },
  },
  plugins: [],
};