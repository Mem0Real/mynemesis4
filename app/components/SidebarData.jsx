import getEverything from "@/libraries/getEverything";

export default async function SidebarData() {
  const data = await getEverything();

  const content = data[0].map((category) => {
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
            {data[1].map((parent) => {
              return (
                category.id === parent.CategoryId && (
                  <div
                    key={parent.id}
                    className="flex flex-col items-start ps-2 text-md mb-1"
                  >
                    <details>
                      <summary className="w-64 h-8 cursor-pointer py-6">
                        {parent.name}
                      </summary>
                      <div>
                        {data[2].map((child) => {
                          return (
                            parent.id === child.ParentId && (
                              <div
                                key={child.id}
                                className="flex flex-col items-start ps-2 text-md mb-1"
                              >
                                <details>
                                  <summary className="w-64 h-8 cursor-pointer py-6">
                                    {child.name}
                                  </summary>
                                  <div>
                                    {data[3].map((item) => {
                                      return (
                                        child.id === item.ChildId && (
                                          <div
                                            key={item.id}
                                            className="flex flex-col items-start ps-2 text-md mb-1"
                                          >
                                            <li className="w-64 h-8 cursor-pointer py-6">
                                              {item.name}
                                            </li>
                                          </div>
                                        )
                                      );
                                    })}
                                  </div>
                                </details>
                              </div>
                            )
                          );
                        })}
                      </div>
                    </details>
                  </div>
                )
              );
            })}
          </div>
        </details>
      </div>
    );
  });

  return content;
}
