import { Suspense } from "react";
// import Parent from "./Parent";
import getEntries from "@/libraries/getEntries";

export default async function Items(ChildId) {
  const items = await getEntries("items", ChildId);

  const content = items.map((item) => {
    return (
      <div
        key={item.id}
        className="flex flex-col items-start ps-2 text-md mb-1"
      >
        <li className="w-64 h-8 cursor-pointer py-6">{item.name}</li>
      </div>
    );
  });
  return content;
}
