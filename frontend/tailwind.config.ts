import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ".flowbite-react\\class-list.json",
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue-dark": "#1e293b", // Example for the dark background
        "custom-gray-light": "#f3f4f6", // Example for the card background
        "custom-orange": "#f97316", // For the 'ball'
        "custom-blue-blob": "#3b82f6", // For the 'blob'
        green: {
          50: "#30AF5B",
          90: "#292C27",
        },
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
        orange: {
          50: "#FF814C",
        },
        blue: {
          70: "#021639",
        },
        yellow: {
          50: "#FEC601",
        },
      },
      boxShadow: {
        soft: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        "bg-img-1": "url('/img-1.jpg')",
        "bg-img-2": "url('/img-2.jpg')",
        "feature-bg": "url('/feature.png')",
        pattern: "url('/popcorn.png')",
        "pattern-2": "url('/download.jpg')",
        "pattern-3": "url('/repair.jpg')",
      },
      screens: {
        xs: "400px",
        md: "1000px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      maxWidth: {
        "10xl": "1512px",
      },
      borderRadius: {
        "5xl": "40px",
      },
    },
  },
  plugins: [flowbiteReact],
};
