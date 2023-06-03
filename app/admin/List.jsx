"use client";

import React, { useState, useEffect, Suspense } from "react";
import "flowbite";
import Modal from "./components/Modal";

export default function List({ closeList, data }) {
  const [addData, setAddData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);

  const [cat, setCat] = useState({});
  const [par, setPar] = useState({});
  const [chi, setChi] = useState({});

  const categories = data[0];
  const parents = data[1];
  const children = data[2];
  const items = data[3];

  const Add = (e) => {
    // Show Add Modal
  };
  const Edit = (e) => {};
  const Delete = (e) => {};

  const handleAdd = (categoryId, parentId = null, chi = null) => {
    setAddData({ ...addData, CategoryId: categoryId });
    parentId && setAddData({ ...addData, ParentId: parentId });
    chi && setAddData({ ...addData, ParentId: chi });
    setShowAddModal(!showAddModal);
  };

  const hideAddModal = () => {
    setShowAddModal(false);
  };

  const catDropDown = (categoryId) => {
    // !cat.id
    //   ? setCat({ id: categoryId, open: true })
    //   : cat.id === categoryId &&
    //     setCat({ ...cat, open: !cat.open }) &&
    //     // par.open === true &&
    //     setPar({ id: "", open: false }) &&
    //     // chi.open === true &&
    //     setChi({ id: "", open: false });

    if (!cat.id) {
      setCat({ id: categoryId, open: true });
    } else {
      if (cat.id === categoryId) {
        setCat({ ...cat, open: !cat.open });
        if (cat.open === true) {
          setPar({ ...par, open: false });
          setChi({ ...chi, open: false });
        }
      } else {
        setCat({ ...cat, open: false });
        setCat({ id: categoryId, open: !cat.open });
      }
    }
  };

  const parDropDown = (parentId) => {
    !par.id
      ? setPar({ id: parentId, open: true })
      : par.id === parentId && setPar({ ...par, open: !par.open });

    if (!par.id) {
      setPar({ id: parentId, open: true });
    } else {
      if (par.id === parentId) {
        setPar({ ...par, open: !par.open });
        if (par.open === true) {
          setChi({ ...chi, open: false });
        }
      } else {
        setPar({ ...par, open: false });
        setPar({ id: parentId, open: !par.open });
      }
    }
  };

  const childDropDown = (childId) => {
    !chi.id
      ? setChi({ id: childId, open: true })
      : chi.id === childId && setChi({ ...chi, open: !chi.open });
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
      <div className="relative rounded-xl overflow-auto shadow-md shadow-black">
        <table className="w-full text-sm text-left text-neutral-100 dark:text-gray-400">
          <thead className="text-xs text-neutral-100 border-b uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-5">Name</th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              return (
                <>
                  <tr
                    key={category.id}
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

                  {parents.map((parent) => {
                    return (
                      parent.CategoryId === category.id && (
                        <>
                          <tr
                            key={parent.id}
                            colSpan={4}
                            className={`${
                              cat.id === category.id && cat.open === true
                                ? ""
                                : "collapse"
                            } bg-neutral-800 text-neutral-100 cursor-pointer hover:bg-neutral-900 dark:bg-neutral-900 dark:border-gray-700`}
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
                                <>
                                  <tr
                                    key={child.id}
                                    colSpan={4}
                                    className={`${
                                      par.id === parent.id && par.open === true
                                        ? ""
                                        : "collapse"
                                    } bg-neutral-700 text-neutral-100 cursor-pointer hover:bg-neutral-800 dark:bg-neutral-900 dark:border-gray-700`}
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
                                  {items.map((item) => {
                                    return (
                                      item.ChildId === child.id && (
                                        <tr
                                          key={item.id}
                                          colSpan={4}
                                          className={`${
                                            chi.id === child.id &&
                                            chi.open === true
                                              ? ""
                                              : "collapse"
                                          } bg-neutral-600 text-neutral-100 cursor-pointer hover:bg-neutral-700 dark:bg-neutral-900 dark:border-gray-700`}
                                        >
                                          <th
                                            scope="row"
                                            className="ps-20 py-4 font-medium whitespace-nowrap dark:text-white"
                                          >
                                            {item.name}
                                          </th>
                                          <td className="px-14 py-4 text-neutral-100 text-sm">
                                            {item.description}
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
                                                    child.id,
                                                    item.id
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
                      )
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        hideAddModal={hideAddModal}
        showAddModal={showAddModal}
        addData={addData}
      />
    </div>
  );
}
