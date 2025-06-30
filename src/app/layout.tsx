import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header.jsx"
import { ThemeProvider } from "next-themes";

const NunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ['300','600','800']
});


export const metadata: Metadata = {
  title: "Country information",
  description: "An app to get countries information with Next Js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://kit.fontawesome.com/bef1951ca5.js" crossOrigin="anonymous"></script>
      </head>
      <body
        className={`h-screen flex flex-col ${NunitoSans.className} antialiased`}
      >
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
