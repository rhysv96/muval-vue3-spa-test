/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
  ],
}
