export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  safelist: [
    // Progress bars
    "bg-green-500",
    "bg-red-500",
    "bg-orange-500",

    // Status text
    "text-green-600",
    "text-red-600",
    "text-orange-600",

    // Doctor availability dots
    "bg-green-400",
    "bg-yellow-400",
    "bg-red-400",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
