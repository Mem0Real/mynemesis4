"use client";

import React, { useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import Button from "@mui/material/Button";
import ListTable from "./ListTable";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import LoadingIndicator from "../utils/LoadingIndicator";

const FunctionsContext = createContext({});

function getAll() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/getAll", fetcher);

  return {
    data: data,
    isLoading: isLoading,
    isError: error,
  };
}

export default function AdminPage() {
  const [alertDialog, setAlertDialog] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [addData, setAddData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const router = useRouter();

  const { data, isLoading, isError } = getAll();

  const Add = (entry, categoryId = null, parentId = null, childId = null) => {
    // Show Add Modal

    !categoryId && !parentId && !childId && setAddData({ entry: entry });
    categoryId && setAddData({ entry: entry, categories: categoryId });
    parentId && setAddData({ entry: entry, parents: parentId });
    childId && setAddData({ entry: entry, children: childId });
    setAddModal(true);
  };

  const Edit = (entry, data = null) => {
    setEditData({
      entry: entry,
      id: data.id,
      name: data.name,
      description: data.description,
      image: data.image,
    });
    if (entry === "items") {
      setEditData((editData) => {
        return {
          ...editData,
          brand: data.brand,
          model: data.model,
          quantity: data.quantity,
          price: data.price,
        };
      });
    }
    setEditModal(true);
  };

  const Delete = (
    entry,
    category = null,
    parent = null,
    child = null,
    item = null
  ) => {
    category &&
      setDeleteData({
        entry: entry,
        categoryId: category.id,
        categoryName: category.name,
      });
    parent &&
      setDeleteData({
        entry: entry,
        parentId: parent.id,
        parentName: parent.name,
      });
    child &&
      setDeleteData({ entry: entry, childId: child.id, childName: child.name });
    item &&
      setDeleteData({ entry: entry, itemId: item.id, itemName: item.name });
    setAlertDialog(true);
  };

  const closeAddModal = () => setAddModal(false);
  const closeEditModal = () => setEditModal(false);
  const handleCloseAlert = () => setAlertDialog(false);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    throw new Error("Failed to load data");
  }

  console.log(data);

  return (
    <FunctionsContext.Provider value={{ Add, Edit, Delete, data }}>
      <div className="flex flex-col w-full justify-center items-center bg-neutral-100 text-neutral-900 md:mt-6">
        <h1 className="text-lg underline underline-offset-2 shadow-inner shadow-black px-5 py-2 rounded-md md:mb-6">
          Admin Page
        </h1>

        <div className="flex-flex-col w-full items-center justify-center relative min-h-screen h-fit">
          <h1 className="text-lg italic underline underline-offset-4 text-center">
            List
          </h1>
          {/* Table */}
          <div className="md:my-6 mb-6 md:pb-5 shadow-md shadow-black">
            <ListTable />

            <div className="flex flex-col w-full justify-center items-center md:mt-3">
              <Button
                variant="contained"
                color="success"
                onClick={() => Add("categories")}
              >
                Add Category
              </Button>
            </div>
          </div>

          {/* Add Modal */}
          <AddModal
            modal={addModal}
            closeAddModal={closeAddModal}
            addData={addData}
            setAddData={setAddData}
          />

          {/* Edit Modal */}
          <EditModal
            modal={editModal}
            closeEditModal={closeEditModal}
            editData={editData}
            setEditData={setEditData}
          />

          {/* Delete Alert */}
          <DeleteModal
            handleCloseAlert={handleCloseAlert}
            deleteData={deleteData}
            setDeleteData={setDeleteData}
            alertDialog={alertDialog}
          />
        </div>
      </div>
    </FunctionsContext.Provider>
  );
}

export const useFunctionsContext = () => useContext(FunctionsContext);
