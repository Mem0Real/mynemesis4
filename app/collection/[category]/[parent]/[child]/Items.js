import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import getEntries from "@/libraries/getEntries";

export default async function Children(props) {
  let content;
  const CategoryId = props.CategoryId;
  const ParentId = props.ParentId;
  const ChildId = props.ChildId;
  const itemsProp = { ChildId: ChildId };

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const itemsData = await getEntries("items", itemsProp);

  if (isObjEmpty(itemsData)) {
    content = (
      <div className="flex flex-col w-full justify-center items-center">
        Data Empty.
      </div>
    );
  } else {
    content = itemsData.map((item) => {
      return (
        <div
          key={item.id}
          className="flex flex-col justify-center items-center"
        >
          <Link
            href={`/collection/${CategoryId}/${ParentId}/${ChildId}/${item.id}`}
          >
            <div className="flex flex-col justify-center items-center w-fit">
              <h1 className="text-center text-lg my-5 underline underline-offset-8 hover:underline-offset-4">
                {item.name}
              </h1>
            </div>
          </Link>
          {/* <Image
            src={`/images/${categoryName}/${parentName}/${childName}/${item.id}.png`}
            width="200"
            height="200"
            alt={`${item.name}-image`}
            className="md:mb-12 md:h-40"
          /> */}
        </div>
      );
    });
  }
  return (
    <div className="flex flex-col flex-wrap justify-center items-center ps-2 text-sm mb-1 w-screen bg-neutral-100 text-neutral-900">
      {content}
    </div>
  );
}
