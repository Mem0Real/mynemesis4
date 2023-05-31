import searchCategories from "@/libraries/searchCategories";
import searchParents from "@/libraries/searchParents";
import searchChildren from "@/libraries/searchChildren";
import searchItems from "@/libraries/searchItems";

import Categories from "./Categories";
import Parents from "./Parents";
import Children from "./Children";
import Items from "./Items";

const SearchPage = async ({ searchParams }) => {
  let searchQuery = searchParams ? searchParams.q : null;
  searchQuery = searchQuery.toLowerCase();

  const encodedSearchQuery = encodeURI(searchQuery || "");

  const searchCategory = searchCategories(encodedSearchQuery);
  const searchParent = searchParents(encodedSearchQuery);
  const searchChild = searchChildren(encodedSearchQuery);
  const searchItem = searchItems(encodedSearchQuery);

  const [categories, parents, children, items] = await Promise.all([
    searchCategory,
    searchParent,
    searchChild,
    searchItem,
  ]);

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  let categoryContent, parentContent, childContent, itemContent, empty;
  if (searchQuery) {
    if (!isObjEmpty(categories)) {
      categoryContent = <Categories categories={categories} />;
    }
    if (!isObjEmpty(parents)) {
      parentContent = <Parents parents={parents} />;
    }
    if (!isObjEmpty(children)) {
      childContent = <Children children={children} />;
    }
    if (!isObjEmpty(items)) {
      itemContent = <Items items={items} />;
    }
    return (
      <div className="flex flex-col gap-8 text-zinc-900 mt-2 md:mt-12">
        <div className="flex justify-end px-3">
          <p className="text-zinc-700">Showing results for "{searchQuery}"</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          {categoryContent}
          {parentContent}
          {childContent}
          {itemContent}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center gap-8 text-zinc-900 mt-2 md:mt-12">
        <h2 className="text-zinc-900">Please type in a keyword....</h2>
      </div>
    );
  }
};

export default SearchPage;
