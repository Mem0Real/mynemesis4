import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import { Suspense } from "react";

import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Loading from "./loading";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  fallback: ["system-ui", "arial"],
});

export const metadata = {
  title: "My Nemesis 4.0",
  description: "Full Stack page for viewing different ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex flex-col overflow-x-hidden no-scrollbar overflow-y-auto overscroll-y-none bg-neutral-100">
          <Navbar />
          <Suspense fallback={<Loading />}>
            <div className="min-h-screen h-fit mt-6">{children}</div>
          </Suspense>
          <Footer />
        </div>
      </body>
    </html>
  );
}
