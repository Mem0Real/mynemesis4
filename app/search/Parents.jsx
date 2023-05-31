import getCategoryId from "@/libraries/getCategoryId";
import Link from "next/link";

export default async function Parents({ parents }) {
  return (
    <div className="flex flex-col justify-evenly gap-6 items-center w-full">
      <p className="text-zinc-500 text-lg ">Parent Categories </p>

      {parents.map(async (parent) => {
        const category = await getCategoryId(parent.CategoryId);
        const categoryName = category.shortName;
        return (
          <div className="flex flex-col justify-center items-center">
            <ul className="list-disc">
              <Link href={`/collection/${categoryName}/${parent.shortName}`}>
                <li>{parent.name}</li>
              </Link>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
