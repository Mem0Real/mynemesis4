"use client";

import React, { useState, useEffect, Suspense } from "react";
import "flowbite";
import Modal from "./components/Modal";

export default function List({ closeList, data }) {
  const [open, setOpen] = useState(false);
  const [addData, setAddData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);

  console.log(showAddModal);

  const categories = data[0];
  const parents = data[1];
  const children = data[2];
  const items = data[3];

  const Add = (e) => {
    // Show Add Modal
  };
  const Edit = (e) => {};
  const Delete = (e) => {};

  const handleAdd = (id) => {
    setAddData({ ...addData, CategoryId: id });
    setShowAddModal(!showAddModal);
  };

  const hideAddModal = () => {
    setShowAddModal(false);
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
      <div className="md:my-6 mb-6 shadow-md shadow-black">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-auto">
            <thead className="text-md text-neutral-100 bg-neutral-950 uppercase rounded-3xl dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
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
                  <tr className="bg-neutral-900 text-neutral-100 cursor-pointer border-b rounded-3xl dark:bg-gray-800 dark:border-gray-700 hover:bg-black dark:hover:bg-gray-600">
                    <td className="px-4">{++index}</td>
                    <th
                      scope="row"
                      className="px-3 py-2 font-medium whitespace-nowrap dark:text-white"
                    >
                      {category.name}
                    </th>
                    <td className="px-12 py-4">{category.description}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex w-full justify-evenly items-center">
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
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
