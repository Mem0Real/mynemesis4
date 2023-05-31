import Link from "next/link";
import getEntry from "@/libraries/getEntry";

export default function Children({ children }) {
  return (
    <div className="flex flex-col justify-evenly gap-6 items-center w-full">
      <p className="text-zinc-500 text-lg ">Child Categories </p>

      {children.map(async (child) => {
        const parentData = await getEntry("parents", child.ParentId);
        const categoryData = await getEntry(
          "categories",
          parentData.CategoryId
        );
        return (
          <div className="flex flex-col justify-center items-center">
            <ul className="list-disc">
              <Link
                href={`/collection/${categoryData.id}/${parentData.id}/${child.id}`}
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
