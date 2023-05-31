import Link from "next/link";
import getCategoryId from "@/libraries/getCategoryId";
import getParentId from "@/libraries/getParentId";
import getChildId from "@/libraries/getChildId";

export default function Items({ items }) {
  return (
    <div className="flex flex-col justify-evenly gap-6 items-center w-full">
      <p className="text-zinc-500 text-lg ">Products </p>
      {items.map(async (item) => {
        const categoryData = getCategoryId(item.CategoryId);
        const parentData = getParentId(item.ParentId);
        const childData = getChildId(item.ChildId);

        const [category, parent, child] = await Promise.all([
          categoryData,
          parentData,
          childData,
        ]);

        const categoryName = category.shortName;
        const parentName = parent.shortName;
        const childName = child.shortName;

        return (
          <div className="flex flex-col justify-center items-center">
            <ul className="list-disc">
              <Link
                href={`/collection/${categoryName}/${parentName}/${childName}/${item.id}`}
              >
                <li>{item.name}</li>
              </Link>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
