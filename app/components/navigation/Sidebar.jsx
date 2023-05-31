import Categories from "../sidebarContent/Categories";
import { Suspense } from "react";
import { Loader } from "../loader/Loader";
import SidebarData from "../SidebarData";

export default async function Sidebar() {
  return (
    <section className="sidebar fixed w-fit h-fit min-h-screen border-r z-10 border-black rounded-r-3xl rounded-t-none bg-neutral-900 text-white mt-10">
      <Suspense fallback={<Loader />}>
        {/* <Categories /> */}
        <SidebarData />
      </Suspense>
    </section>
  );
}
