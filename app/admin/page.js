import Link from "next/link";
import getEverything from "@/libraries/getEverything";
import Actions from "./Actions";

export default async function AdminPage() {
  const res = await getEverything();
  return (
    <div className="flex flex-col w-full justify-center items-center bg-neutral-100 text-neutral-900 md:mt-6">
      <h1 className="text-lg underline underline-offset-2 shadow-inner shadow-black px-5 py-2 rounded-md md:mb-6">
        Admin Page
      </h1>

      <Actions data={res} />
    </div>
  );
}
