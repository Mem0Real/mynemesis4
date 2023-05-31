import { Suspense } from "react";
import Items from "./Items";
import getEntries from "@/libraries/getEntries";

export default async function Children(ParentId) {
  const children = await getEntries("children", ParentId);

  const content = children.map((child) => {
    return (
      <div
        key={child.id}
        className="flex flex-col items-start ps-2 text-md mb-1"
      >
        <details>
          <summary className="w-64 h-8 cursor-pointer py-6">
            {child.name}
          </summary>
          <div>
            <Suspense fallback={<h2>Loading...</h2>}>
              <Items ChildId={child.id} />
            </Suspense>
          </div>
        </details>
      </div>
    );
  });
  return content;
}
