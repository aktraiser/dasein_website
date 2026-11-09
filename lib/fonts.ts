import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Refined Garamond for the large titles; its italic sets the stage directions of the home page.
const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

/** Font variables for <html>, shared by the layout and the global 404 page. */
export const fontVariables = `${sans.variable} ${mono.variable} ${serif.variable}`;
