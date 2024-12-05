/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

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
    forms,
  ],
}
