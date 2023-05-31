import getCategoryId from "@/libraries/getCategoryId";
import getParentId from "@/libraries/getParentId";
import Link from "next/link";

export default function Children({ children }) {
  return (
    <div className="flex flex-col justify-evenly gap-6 items-center w-full">
      <p className="text-zinc-500 text-lg ">Child Categories </p>
      {children.map(async (child) => {
        const categoryData = getCategoryId(child.CategoryId);
        const parentData = getParentId(child.ParentId);

        const [category, parent] = await Promise.all([
          categoryData,
          parentData,
        ]);

        const categoryName = category.shortName;
        const parentName = parent.shortName;
        return (
          <div className="flex flex-col justify-center items-center">
            <ul className="list-disc">
              <Link
                href={`/collection/${categoryName}/${parentName}/${child.shortName}`}
              >
                <li>{child.name}</li>
              </Link>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
