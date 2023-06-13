import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import { Suspense } from "react";

import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Loading from "./loading";
config.autoAddCss = false;

export const metadata = {
  title: "My Nemesis 4.0",
  description: "Full Stack page offering product market",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-between h-full overflow-x-hidden no-scrollbar overflow-y-auto overscroll-y-none bg-neutral-100 relative">
          <Navbar />
          <Suspense fallback={<Loading />}>
            <div className="min-h-screen">{children}</div>
          </Suspense>
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
