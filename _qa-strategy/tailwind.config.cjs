const symPreset = require('./src/sym-ui-tokens/tailwind.preset.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [symPreset],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
};
