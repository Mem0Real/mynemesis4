import { Suspense } from "react";
import Children from "./Children";
import getEntries from "@/libraries/getEntries";

export default async function Parents(CategoryId) {
  const parents = await getEntries("parents", CategoryId);

  const content = parents.map((parent) => {
    return (
      <div
        key={parent.id}
        className="flex flex-col items-start ps-2 text-md mb-1"
      >
        <details>
          <summary className="w-64 h-8 cursor-pointer py-6">
            {parent.name}
          </summary>
          <div>
            <Suspense fallback={<h2>Loading...</h2>}>
              <Children ParentId={parent.id} />
            </Suspense>
          </div>
        </details>
      </div>
    );
  });
  return content;
}
