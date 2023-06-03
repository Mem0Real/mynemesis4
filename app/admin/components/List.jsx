"use client";

import React, { useState, useEffect, Suspense } from "react";
import "flowbite";
import Modal from "./components/Modal";

export default function List({ closeList, data }) {
  const [openCat, setOpenCat] = useState(true);
  const [openPar, setOpenPar] = useState(true);
  const [openChild, setOpenChild] = useState(true);

  const [addData, setAddData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);

  const [catId, setCatId] = useState({});
  const [parId, setParId] = useState({});
  const [childId, setChildId] = useState({});

  const categories = data[0];
  const parents = data[1];
  const children = data[2];
  const items = data[3];

  const Add = (e) => {
    // Show Add Modal
  };
  const Edit = (e) => {};
  const Delete = (e) => {};

  const handleAdd = (categoryId, parentId = null, childId = null) => {
    setAddData({ ...addData, CategoryId: categoryId });
    parentId && setAddData({ ...addData, ParentId: parentId });
    childId && setAddData({ ...addData, ParentId: childId });
    setShowAddModal(!showAddModal);
  };

  const hideAddModal = () => {
    setShowAddModal(false);
  };

  const catDropDown = (categoryId) => {
    // !catId.id
    //   ? setCatId({ id: categoryId, open: openCat })
    //   : catId.id === categoryId && setOpenCat(!openCat);

    if (!catId.id) {
      setCatId({ id: categoryId, open: openCat });
    } else {
      if (catId.id === categoryId) setOpenCat(!openCat);
    }
  };

  const parDropDown = (parentId) => {
    setParId({ id: parentId, open: openPar });
    parId.id === parentId && setOpenPar(!openPar);
  };

  const childDropDown = (childId) => {
    setChildId({ id: childId, open: openChild });
    childId.id === childId && setOpenChild(!openChild);
  };

  return (
    <div className="flex-flex-col w-full items-center justify-center relative min-h-screen">
      <div className="flex justify-end items-end">
        <button
          className="px-4 py-2 rounded-md bg-neutral-800 text-neutral-100"
          onClick={closeList}
        >
          Back
        </button>
      </div>
      <h1 className="text-lg italic underline underline-offset-4 text-center">
        List
      </h1>

      {/* Table */}
      {/* <div className="relative rounded-xl overflow-auto shadow-md shadow-black">
        <table className="w-full text-sm text-left text-neutral-100 dark:text-gray-400">
          <thead className="text-xs text-neutral-100 border-b uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="px-6 py-5">Name</th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return (
                <>
                  <tr
                    className="bg-neutral-900 text-neutral-200 cursor-pointer dark:bg-neutral-900 dark:border-gray-700 hover:bg-black dark:hover:bg-gray-600"
                    onClick={() => catDropDown(category.id)}
                  >
                    <th className="px-2 md:px-6 py-2 font-medium whitespace-nowrap dark:text-white">
                      {category.name}
                    </th>
                    <td className="px-6 py-4">{category.description}</td>
                    <td className="py-4 text-right">
                      <div className="flex w-full justify-around items-center">
                        <button
                          type="button"
                          data-modal-target="addModal"
                          data-modal-toggle="addModal"
                          className="mx-2 hover:underline hover:underline-offset-2"
                          onClick={() => handleAdd(category.id)}
                        >
                          Add
                        </button>
                        <button className="mx-2 hover:underline hover:underline-offset-2">
                          Edit
                        </button>
                        <button className="mx-2 hover:underline hover:underline-offset-2">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  {catId.id === category.id && catId.open === true && (
                    <tr className=" bg-neutral-800 text-neutral-100 cursor-pointer border-b dark:bg-neutral-900 dark:border-gray-700">
                      <th colSpan={4}>
                        {parents.map((parent, index2) => {
                          return (
                            parent.CategoryId === category.id && (
                              <>
                                <tr
                                  colSpan={4}
                                  className="hover:bg-neutral-500"
                                  onClick={() => parDropDown(parent.id)}
                                >
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                                  >
                                    {parent.name}
                                  </th>
                                  <td className="px-6 py-4 text-gray-600 text-xs">
                                    {parent.description}
                                  </td>
                                  <td className="py-4 text-right">
                                    <div className="flex w-full justify-around items-center">
                                      <button
                                        type="button"
                                        data-modal-target="addModal"
                                        data-modal-toggle="addModal"
                                        className="mx-2 hover:underline hover:underline-offset-2"
                                        onClick={() =>
                                          handleAdd(category.id, parent.id)
                                        }
                                      >
                                        Add
                                      </button>
                                      <button className="mx-2 hover:underline hover:underline-offset-2">
                                        Edit
                                      </button>
                                      <button className="mx-2 hover:underline hover:underline-offset-2">
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                {parId.id === parent.id &&
                                  parId.open === true && (
                                    <tr className=" bg-neutral-200 text-neutral-800 cursor-pointer border-b dark:bg-neutral-900 dark:border-gray-700">
                                      <th></th>
                                      <th colSpan={3}>
                                        {children.map((child) => {
                                          return (
                                            child.ParentId === parent.id && (
                                              <>
                                                <tr
                                                  colSpan={4}
                                                  className="hover:bg-neutral-200"
                                                  onClick={() =>
                                                    childDropDown(child.id)
                                                  }
                                                >
                                                  <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                                                  >
                                                    {child.name}
                                                  </th>
                                                  <td className="px-6 py-4 text-gray-600 text-xs">
                                                    {child.description}
                                                  </td>
                                                  <td className="py-4 text-right">
                                                    <div className="flex w-full justify-around items-center">
                                                      <button
                                                        type="button"
                                                        data-modal-target="addModal"
                                                        data-modal-toggle="addModal"
                                                        className="mx-2 hover:underline hover:underline-offset-2"
                                                        onClick={() =>
                                                          handleAdd(
                                                            category.id,
                                                            parent.id,
                                                            child.id
                                                          )
                                                        }
                                                      >
                                                        Add
                                                      </button>
                                                      <button className="mx-2 hover:underline hover:underline-offset-2">
                                                        Edit
                                                      </button>
                                                      <button className="mx-2 hover:underline hover:underline-offset-2">
                                                        Delete
                                                      </button>
                                                    </div>
                                                  </td>
                                                </tr>

                                                {childId.id === child.id &&
                                                  childId.open === true && (
                                                    <tr className=" bg-neutral-200 text-neutral-800 cursor-pointer border-b dark:bg-neutral-900 dark:border-gray-700 hover:bg-neutral-400 dark:hover:bg-gray-600">
                                                      <th></th>
                                                      <th colSpan={3}>
                                                        {children.map(
                                                          (child) => {
                                                            return (
                                                              child.ParentId ===
                                                                parent.id && (
                                                                <tr
                                                                  colSpan={4}
                                                                  className="hover:bg-neutral-200"
                                                                  onClick={() =>
                                                                    childDropDown(
                                                                      child.id
                                                                    )
                                                                  }
                                                                >
                                                                  <th
                                                                    scope="row"
                                                                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                                                                  >
                                                                    {child.name}
                                                                  </th>
                                                                  <td className="px-6 py-4 text-gray-600 text-xs">
                                                                    {
                                                                      child.description
                                                                    }
                                                                  </td>
                                                                  <td className="py-4 text-right">
                                                                    <div className="flex w-full justify-around items-center">
                                                                      <button
                                                                        type="button"
                                                                        data-modal-target="addModal"
                                                                        data-modal-toggle="addModal"
                                                                        className="mx-2 hover:underline hover:underline-offset-2"
                                                                        onClick={() =>
                                                                          handleAdd(
                                                                            category.id,
                                                                            parent.id,
                                                                            child.id
                                                                          )
                                                                        }
                                                                      >
                                                                        Add
                                                                      </button>
                                                                      <button className="mx-2 hover:underline hover:underline-offset-2">
                                                                        Edit
                                                                      </button>
                                                                      <button className="mx-2 hover:underline hover:underline-offset-2">
                                                                        Delete
                                                                      </button>
                                                                    </div>
                                                                  </td>
                                                                </tr>
                                                              )
                                                            );
                                                          }
                                                        )}
                                                      </th>
                                                    </tr>
                                                  )}
                                              </>
                                            )
                                          );
                                        })}
                                      </th>
                                    </tr>
                                  )}
                              </>
                            )
                          );
                        })}
                      </th>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div> */}

      <div className="relative rounded-xl overflow-auto shadow-md shadow-black">
        <table className="w-full text-sm text-left text-neutral-100 dark:text-gray-400">
          <thead className="text-xs text-neutral-100 border-b uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="px-6 py-5">Name</th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return (
                <>
                  <tr
                    className="bg-neutral-900 text-neutral-200 cursor-pointer dark:bg-neutral-900 dark:border-gray-700 hover:bg-black dark:hover:bg-gray-600"
                    onClick={() => catDropDown(category.id)}
                  >
                    <th className="px-2 md:px-6 py-2 font-medium whitespace-nowrap dark:text-white">
                      {category.name}
                    </th>
                    <td className="px-6 py-4">{category.description}</td>
                    <td className="py-4 text-right">
                      <div className="flex w-full justify-around items-center">
                        <button
                          type="button"
                          data-modal-target="addModal"
                          data-modal-toggle="addModal"
                          className="mx-2 hover:underline hover:underline-offset-2"
                          onClick={() => handleAdd(category.id)}
                        >
                          Add
                        </button>
                        <button className="mx-2 hover:underline hover:underline-offset-2">
                          Edit
                        </button>
                        <button className="mx-2 hover:underline hover:underline-offset-2">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>

                  {parents.map((parent, index2) => {
                    return (
                      parent.CategoryId === category.id && (
                        <>
                          <tr
                            colSpan={4}
                            className={`${
                              catId.id === category.id && catId.open === true
                                ? ""
                                : "collapse"
                            } bg-neutral-700 text-neutral-100 cursor-pointer hover:bg-neutral-900 dark:bg-neutral-900 dark:border-gray-700`}
                            onClick={() => parDropDown(parent.id)}
                          >
                            <th
                              scope="row"
                              className="px-10 py-4 font-medium whitespace-nowrap dark:text-white"
                            >
                              {parent.name}
                            </th>
                            <td className="px-10 py-4 text-neutral-100 text-sm">
                              {parent.description}
                            </td>
                            <td className="text-center">
                              <div className="flex w-full justify-around items-center">
                                <button
                                  type="button"
                                  data-modal-target="addModal"
                                  data-modal-toggle="addModal"
                                  className="mx-2 hover:underline hover:underline-offset-2"
                                  onClick={() =>
                                    handleAdd(category.id, parent.id)
                                  }
                                >
                                  Add
                                </button>
                                <button className="mx-2 hover:underline hover:underline-offset-2">
                                  Edit
                                </button>
                                <button className="mx-2 hover:underline hover:underline-offset-2">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                          {children.map((child) => {
                            return (
                              child.ParentId === parent.id && (
                                <tr
                                  colSpan={4}
                                  className={`${
                                    parId.id === parent.id &&
                                    parId.open === true
                                      ? ""
                                      : "collapse"
                                  } bg-neutral-500 text-neutral-100 cursor-pointer hover:bg-neutral-700 dark:bg-neutral-900 dark:border-gray-700`}
                                  onClick={() => childDropDown(child.id)}
                                >
                                  <th
                                    scope="row"
                                    className="px-14 py-4 font-medium whitespace-nowrap dark:text-white"
                                  >
                                    {child.name}
                                  </th>
                                  <td className="px-14 py-4 text-neutral-100 text-sm">
                                    {child.description}
                                  </td>
                                  <td className="text-start">
                                    <div className="flex w-full justify-around items-center">
                                      <button
                                        type="button"
                                        data-modal-target="addModal"
                                        data-modal-toggle="addModal"
                                        className="mx-2 hover:underline hover:underline-offset-2"
                                        onClick={() =>
                                          handleAdd(
                                            category.id,
                                            parent.id,
                                            child.id
                                          )
                                        }
                                      >
                                        Add
                                      </button>
                                      <button className="mx-2 hover:underline hover:underline-offset-2">
                                        Edit
                                      </button>
                                      <button className="mx-2 hover:underline hover:underline-offset-2">
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )
                            );
                          })}
                        </>
                      )
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* 
      <>
{parId.id === parent.id &&
                                parId.open === true && (
                                  <tr className=" bg-neutral-200 text-neutral-800 cursor-pointer border-b dark:bg-neutral-900 dark:border-gray-700">
                                    <th></th>
                                    <th colSpan={3}>
                                      {children.map((child) => {
                                        return (
                                          child.ParentId === parent.id && (
                                            <>
                                              <tr
                                                colSpan={4}
                                                className="hover:bg-neutral-200"
                                                onClick={() =>
                                                  childDropDown(child.id)
                                                }
                                              >
                                                <th
                                                  scope="row"
                                                  className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                                                >
                                                  {child.name}
                                                </th>
                                                <td className="px-6 py-4 text-gray-600 text-xs">
                                                  {child.description}
                                                </td>
                                                <td className="py-4 text-right">
                                                  <div className="flex w-full justify-around items-center">
                                                    <button
                                                      type="button"
                                                      data-modal-target="addModal"
                                                      data-modal-toggle="addModal"
                                                      className="mx-2 hover:underline hover:underline-offset-2"
                                                      onClick={() =>
                                                        handleAdd(
                                                          category.id,
                                                          parent.id,
                                                          child.id
                                                        )
                                                      }
                                                    >
                                                      Add
                                                    </button>
                                                    <button className="mx-2 hover:underline hover:underline-offset-2">
                                                      Edit
                                                    </button>
                                                    <button className="mx-2 hover:underline hover:underline-offset-2">
                                                      Delete
                                                    </button>
                                                  </div>
                                                </td>
                                              </tr>

                                              {childId.id === child.id &&
                                                childId.open === true && (
                                                  <tr className=" bg-neutral-200 text-neutral-800 cursor-pointer border-b dark:bg-neutral-900 dark:border-gray-700 hover:bg-neutral-400 dark:hover:bg-gray-600">
                                                    <th></th>
                                                    <th colSpan={3}>
                                                      {children.map((child) => {
                                                        return (
                                                          child.ParentId ===
                                                            parent.id && (
                                                            <tr
                                                              colSpan={4}
                                                              className="hover:bg-neutral-200"
                                                              onClick={() =>
                                                                childDropDown(
                                                                  child.id
                                                                )
                                                              }
                                                            >
                                                              <th
                                                                scope="row"
                                                                className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                                                              >
                                                                {child.name}
                                                              </th>
                                                              <td className="px-6 py-4 text-gray-600 text-xs">
                                                                {
                                                                  child.description
                                                                }
                                                              </td>
                                                              <td className="py-4 text-right">
                                                                <div className="flex w-full justify-around items-center">
                                                                  <button
                                                                    type="button"
                                                                    data-modal-target="addModal"
                                                                    data-modal-toggle="addModal"
                                                                    className="mx-2 hover:underline hover:underline-offset-2"
                                                                    onClick={() =>
                                                                      handleAdd(
                                                                        category.id,
                                                                        parent.id,
                                                                        child.id
                                                                      )
                                                                    }
                                                                  >
                                                                    Add
                                                                  </button>
                                                                  <button className="mx-2 hover:underline hover:underline-offset-2">
                                                                    Edit
                                                                  </button>
                                                                  <button className="mx-2 hover:underline hover:underline-offset-2">
                                                                    Delete
                                                                  </button>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          )
                                                        );
                                                      })}
                                                    </th>
                                                  </tr>
                                                )}
                                            </>
                                          )
                                        );
                                      })}
                                    </th>
                                  </tr>
                                )}
      </> */}

      {/* <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`fixed top-28 left-20 md:top-40 lg:left-1/3 z-50 ${
          !showAddModal ? "hidden" : ""
        }  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
              <form className="space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <label
                      for="remember"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <a
                    href="#"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      <Modal
        hideAddModal={hideAddModal}
        showAddModal={showAddModal}
        addData={addData}
      />
    </div>
  );
}
