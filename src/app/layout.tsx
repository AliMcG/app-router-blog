import "~/styles/globals.css";

import { Inter, Montserrat, Frank_Ruhl_Libre } from "next/font/google";
import { cookies } from "next/headers";
import { polyfill } from "interweave-ssr";
import Navbar from "./_components/NavBar";
import NextAuthProvider from "@/_components/providers/SessionProvider";
import Footer from "@/_components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
//  Polyfill function here to manage a hydration error caused by <Markup> component
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
polyfill();
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-monts",
});

const frank = Frank_Ruhl_Libre({
  subsets: ["latin"],
  variable: "--font-frank",
});

export const metadata = {
  title: "Harry Duncton",
  description: "A blog to capture the roving mind",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} ${frank.variable} ${montserrat.variable}`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextAuthProvider>
            <Navbar />
            {children}
            <SpeedInsights />
            <Footer />
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
