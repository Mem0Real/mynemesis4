"use client";

import React, { useState, useRef, createContext, useContext } from "react";

// import {Box, Button, Typography, Modal, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material"
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ListTable from "./components/ListTable";

const FunctionsContext = createContext({});

export default function List({ closeList, data }) {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [addData, setAddData] = useState({});

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

  const Add = (categoryId, parentId = null, childId = null, itemId = null) => {
    // Show Add Modal
    setModal(true);
    setAddData({
      ...data,
      CategoryId: categoryId,
      ParentId: parentId,
      ChildId: childId,
    });
  };
  const Edit = (e) => {};
  const Delete = (e) => {};

  const handleClose = () => setModal(false);

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
    setData({ ...data, image: changeEvent.target.files[0] });
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setData({ ...data, [fieldName]: fieldValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let res = await createCategory(data);
    setStatus(res);
    setData({});
    setImageSrc();
  };

  const catDropDown = (categoryId) => {
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

    if (!chi.id) {
      setChi({ id: childId, open: true });
    } else {
      if (chi.id === childId) {
        setChi({ ...chi, open: !chi.open });
      } else {
        setChi({ ...chi, open: false });
        setChi({ id: childId, open: !chi.open });
      }
    }
    console.log(chi);
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
        <div className="md:my-6 mb-6 shadow-md shadow-black">
          <ListTable data={data} add={Add} edit={Edit} delete={Delete} />
        </div>
      </FunctionsContext.Provider>

      {/* Add Modal */}
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="min-h-screen h-fit"
      >
        <Box sx={modalStyle} className="">
          <h1 className="text-black h-12">Hi</h1>
          <h1 className="text-black h-12">Hi</h1>
          <h1 className="text-black h-12">Hi</h1>
          <h1 className="text-black h-12">Hi</h1>
          <h1 className="text-black h-12">Hi</h1>
          <h1 className="text-black h-12">Hi</h1>
          <h1 className="text-black h-12">Hi</h1>
        </Box>
      </Modal>
    </div>
  );
}

export const useFunctionsContext = () => useContext(FunctionsContext);