import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

export default async function Items(item) {
  const currentCategory = item.params.category;
  const currentParent = item.params.parent;
  const currentChild = item.params.child;
  const currentItemId = item.params.item;

  const categoryData = await getCategory(currentCategory);
  const categoryItem = categoryData[0];

  const parentData = await getParent(categoryItem.id, currentParent);
  const parentItem = parentData[0];

  // const childData = await getChild(
  //   categoryItem.id,
  //   parentItem.id,
  //   currentChild
  // );
  // const childItem = childData[0];

  // const itemData = await getItem(
  //   categoryItem.id,
  //   parentItem.id,
  //   childItem.id,
  //   currentItemId
  // );

  // const itemDetail = itemData[0];

  // function isObjEmpty(obj) {
  //   return Object.keys(obj).length === 0;
  // }
  // if (!isObjEmpty(itemDetail)) {
  //   return (
  //     <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-neutral-100 text-neutral-900">
  //       <div className="flex justify-end items-end w-full p-4">
  //         <Link
  //           href={`/collection/${currentCategory}/${currentParent}/${currentChild}`}
  //         >
  //           <h2 className="text-sm px-2 py-1 mt-4 md:px-4 md:py-2 bg-neutral-900 text-white rounded-lg">
  //             Go Back
  //           </h2>
  //         </Link>
  //       </div>

  //       <div className="flex flex-col md:flex-row justify-center items-center w-screen min-h-screen">
  //         <Image
  //           src={`/images/${currentCategory}/${currentParent}/${currentChild}/${itemDetail.id}.png`}
  //           width="500"
  //           height="500"
  //           alt={`${itemDetail.name}-image`}
  //           className="md:mb-12"
  //         />
  //         <div className="flex flex-col justify-evenly items-center md:h-96 md:w-96 text-center">
  //           <p className="my-6">
  //             Name <br /> {itemDetail.name}
  //           </p>
  //           <p className="my-6">
  //             Type <br /> {itemDetail.type}
  //           </p>
  //           <p className="my-6">
  //             Model <br /> {itemDetail.model}
  //           </p>
  //           <p className="my-6 md:h-24 h-fit">
  //             Details <br /> {itemDetail.description}
  //           </p>
  //           <p className="my-6">
  //             Quantity <br /> {itemDetail.quantity}
  //           </p>
  //           <p className="my-6">
  //             Price <br /> {itemDetail.price}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="flex flex-col justify-around items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit">
  //       <div className="flex justify-end items-end w-full p-4">
  //         <Link
  //           href={`/collection/${currentCategory}/${currentParent}${currentChild}`}
  //         >
  //           <h2 className="absolute z-0 top-20 right-0 px-2 py-1 md:top-24 md:right-12 md:px-4 md:py-2 bg-neutral-900 text-white rounded-lg">
  //             Go Back
  //           </h2>
  //         </Link>
  //       </div>
  //       <h1>Empty</h1>
  //     </div>
  //   );
  // }
}
