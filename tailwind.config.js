/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {},
};