import Items from "./Items";
import { Suspense } from "react";
import Link from "next/link";
import getEntry from "@/libraries/getEntry";

export async function generateMetadata({ params: { child } }) {
  let firstLetter = child[0];
  firstLetter = firstLetter.toUpperCase();
  let childName = firstLetter + child.slice(1);

  return {
    title: `Nemesis - ${childName}`,
  };
}

export default async function Child(props) {
  let currentCategory = props.params.category;
  let currentParent = props.params.parent;
  let currentChild = props.params.child;
  const childData = await getEntry("children", currentChild);

  const content = (
    <div
      key={childData.id}
      className="flex flex-col justify-between items-center text-sm mb-1 w-screen bg-neutral-100 text-neutral-900 h-fit"
    >
      <div className="flex justify-end items-end w-full p-4">
        <Link href={`/collection/${currentCategory}`}>
          <h2 className="px-2 py-1 md:top-24 md:right-12 md:px-4 md:py-2 bg-neutral-900 text-white rounded-lg">
            Go Back
          </h2>
        </Link>
      </div>
      <h1 className="flex-none text-lg md:mb-12 border border-x-0 border-3 rounded-md border-black md:px-6 md:py-2">
        {childData.name}
      </h1>
      <p className="h-24 text-center mt-4 md:mt-2">{childData.description}</p>
      <div className="flex-initial min-h-screen w-full">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Items
            ChildId={currentChild}
            ParentId={currentParent}
            CategoryId={currentCategory}
          />
        </Suspense>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-evenly items-center w-screen mt-12">
      {content}
    </div>
  );
}
