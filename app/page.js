import Sidebar from "./components/navigation/Sidebar";
import { Suspense } from "react";
import Link from "next/link";
import { Loader } from "./components/loader/Loader";


export default async function Home() {
  return (
    <main className="flex min-h-screen h-fit min-w-screen items-center justify-center bg-neutral-100 text-neutral-900 relative">
      <Suspense fallback={<Loader />}>
        <div className="flex-none absolute top-0 left-0 hidden md:block">
          <Sidebar />
        </div>
      </Suspense>
      <div className="flex-initial w-full min-h-screen pt-12 md:ml-56">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-yellow-300">Home Page</h1>
          <p>
            <Link href="/categories">Categories</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
