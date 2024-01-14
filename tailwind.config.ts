import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        monts: ['var(--font-monts)'],
        frank: ['var(--font-frank)']
      },
      color: {
        customBlue: '#F2F7FF'
      },
      backgroundColor: {
        // Adds the custom background clour to use in the code.
        custom: {
          blue: 'var(--color-custom-blue)'
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
