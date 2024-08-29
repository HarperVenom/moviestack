import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "MovieStack",
  description: "Movies Interactive Watchlists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} flex flex-col min-h-svh max-w-[1200px] w-full mx-auto overflow-x-hidden`}
      >
        {/* <div
          className="opacity-30 brightness-200 fixed left-0 w-screen h-screen z-[-1] saturate-[0.3]"
          style={{
            backgroundImage: `url(https://www.toptal.com/designers/subtlepatterns/uploads/circle-blues.png)`,
          }}
        ></div> */}

        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
