import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Popular from "./components/Popular";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BaffTalk",
  description: "Anyone can talk about anything !!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="flex mt-[55px]">
          <Sidebar />
          <div className="h-screen bg-gray-300">
            <div className="h-full w-px bg-gray-300"></div>
          </div>
           <div className="w-full">
           {children}
           </div>
          <Popular />
        </div>
       
      </body>
    </html>
  );
}
