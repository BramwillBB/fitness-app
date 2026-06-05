/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "surface-variant": "#e2e2e2",
        "error-container": "#ffdad6",
        "outline": "#727a65",
        "surface-container-low": "#f3f3f3",
        "tertiary-fixed-dim": "#c6c6c6",
        "on-primary-container": "#3e6b00",
        "on-secondary-fixed-variant": "#474646",
        "surface-container-high": "#e8e8e8",
        "primary-container": "#a4f050",
        "inverse-on-surface": "#f1f1f1",
        "surface-dim": "#dadada",
        "on-error-container": "#93000a",
        "secondary-fixed": "#e5e2e1",
        "background": "#f9f9f9",
        "on-tertiary-fixed": "#1a1c1c",
        "primary-fixed": "#abf857",
        "primary": "#3d6a00",
        "inverse-primary": "#90da3c",
        "surface-container-lowest": "#ffffff",
        "surface": "#f9f9f9",
        "inverse-surface": "#2f3131",
        "on-surface-variant": "#414937",
        "on-surface": "#1a1c1c",
        "on-background": "#1a1c1c",
        "surface-container-highest": "#e2e2e2",
        "tertiary-fixed": "#e2e2e2",
        "on-tertiary": "#ffffff",
        "on-primary-fixed-variant": "#2d5000",
        "surface-container": "#eeeeee",
        "secondary": "#5f5e5e",
        "on-secondary-fixed": "#1c1b1b",
        "surface-tint": "#3d6a00",
        "surface-bright": "#f9f9f9",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "secondary-container": "#e5e2e1",
        "primary-fixed-dim": "#90da3c",
        "on-secondary": "#ffffff",
        "on-tertiary-container": "#5f6060",
        "outline-variant": "#c1cab2",
        "on-primary-fixed": "#0f2000",
        "on-tertiary-fixed-variant": "#454747",
        "tertiary": "#5d5f5f",
        "on-primary": "#ffffff",
        "tertiary-container": "#dbdbdb",
        "secondary-fixed-dim": "#c8c6c5",
        "on-secondary-container": "#656464"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "margin-mobile": "16px",
        "xl": "80px",
        "gutter": "24px",
        "base": "8px",
        "lg": "48px",
        "xs": "4px",
        "margin-desktop": "64px",
        "sm": "12px",
        "md": "24px"
      },
      "fontFamily": {
        "headline-lg": ["Space Grotesk", "sans-serif"],
        "display-lg": ["Space Grotesk", "sans-serif"],
        "body-md": ["Geist", "sans-serif"],
        "label-sm": ["JetBrains Mono", "monospace"]
      },
      "fontSize": {
        "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "600"}],
        "headline-lg": ["32px", {"lineHeight": "1.2", "fontWeight": "600"}],
        "display-lg": ["56px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "label-sm": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "500"}]
      }
    }
  },
  plugins: [],
}
