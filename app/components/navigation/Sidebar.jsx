import { Suspense } from "react";
import { Loader } from "../loader/Loader";
import SidebarData from "../(data)/sidebarData/SidebarData";

export default async function Sidebar() {
  return (
    <section className="sidebar top-0 w-fit h-fit min-h-screen border-r z-10 border-black rounded-r-3xl rounded-t-none bg-neutral-900 text-white">
      <Suspense fallback={<Loader />}>
        <SidebarData />
      </Suspense>
    </section>
  );
}
