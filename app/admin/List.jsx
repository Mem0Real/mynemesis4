"use client";

import React, { useState, useRef, createContext, useContext } from "react";

import Button from "@mui/material/Button";
import ListTable from "./components/ListTable";
import Add from "./components/AddModal";
import Delete from "./components/AlertPage";
import Edit from "./components/EditModal";

const FunctionsContext = createContext({});

export default function List({ closeList, data }) {
  const [alertDialog, setAlertDialog] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [addData, setAddData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const [cat, setCat] = useState({});
  const [par, setPar] = useState({});
  const [chi, setChi] = useState({});

  const imageRef = useRef();

  const categories = data[0];
  const parents = data[1];
  const children = data[2];
  const items = data[3];

  const modalStyle = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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

  const handleCloseAlert = () => {
    setAlertDialog(false);
  };

  return (
    <div className="flex-flex-col w-full items-center justify-center relative min-h-screen h-fit">
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
      <FunctionsContext.Provider value={{ Add, Edit, Delete }}>
        <div className="md:my-6 mb-6 md:pb-5 shadow-md shadow-black">
          <ListTable data={data} add={Add} edit={Edit} delete={Delete} />
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
      </FunctionsContext.Provider>

      {/* Add Modal */}
      <Add
        modal={addModal}
        closeAddModal={closeAddModal}
        addData={addData}
        setAddData={setAddData}
      />

      {/* Edit Modal */}
      <Edit
        modal={editModal}
        closeEditModal={closeEditModal}
        editData={editData}
        setEditData={setEditData}
      />

      {/* Delete Alert */}
      <Delete
        handleCloseAlert={handleCloseAlert}
        deleteData={deleteData}
        setDeleteData={setDeleteData}
        alertDialog={alertDialog}
      />
    </div>
  );
}

export const useFunctionsContext = () => useContext(FunctionsContext);
