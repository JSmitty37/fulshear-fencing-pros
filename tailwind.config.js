/** Tailwind config — compiles the same utility classes the site already uses
 *  into a static, minified stylesheet (replaces the production-unsafe CDN).
 *  Tokens mirror the former inline `tailwind.config` exactly, so output is
 *  visually identical to the previous CDN runtime build.
 */
module.exports = {
  content: [
    './*.html',
    './services/**/*.html',
    './neighborhoods/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#1B3A2D', light: '#2A5440', dark: '#0E1F17', muted: '#3D6B52' },
        cedar:  { DEFAULT: '#8B6914', light: '#B8892A' },
        burnt:  { DEFAULT: '#C85A1A', dark: '#A34515', hover: '#D96B2B' },
        cream:  '#FAF9F7',
        warm:   '#F0EDE6',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
