import { Suspense } from "react";
import Parents from "./Parents";
import getEntries from "@/libraries/getEntries";

export default async function Category() {
  const categories = await getEntries("categories");

  const content = categories.map((category) => {
    return (
      <div
        key={category.id}
        className="flex flex-col items-start ps-2 text-md mb-1"
      >
        <details>
          <summary className="w-64 h-8 cursor-pointer py-6">
            {category.name}
          </summary>
          <div>
            <Suspense fallback={<h2>Loading...</h2>}>
              <Parents CategoryId={category.id} />
            </Suspense>
          </div>
        </details>
      </div>
    );
  });
  return content;
}
