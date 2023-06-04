"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";

// import {Box, Button, Typography, Modal, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  AddOutlined,
  DeleteForeverOutlined,
  EditOutlined,
} from "@mui/icons-material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function List({ closeList, data }) {
  // const [open, setOpen] = useState({
  //   settings: [{}],
  // });

  const [open, setOpen] = useState(false);
  const [catId, setCatId] = useState({});
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

  const handleClick = (id) => {
    catId.id === id && setOpen(!open);
    setCatId({ id: id, open: open });
  };

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
      <div className="md:my-6 mb-6 shadow-md shadow-black">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer component={Paper}>
            <Table aria-label="table" stickyHeader size="large">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <h1 className="text-md font-semibold">Name</h1>
                  </TableCell>
                  <TableCell>
                    <h1 className="text-md font-semibold">Description</h1>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category, index) => (
                  <>
                    <TableRow
                      key={category.name}
                      sx={{ "& > *": { borderBottom: "unset" } }}
                    >
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => catDropDown(category.id)}
                        >
                          {cat.id === category.id && cat.open ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      {/* Buttons */}
                      <TableCell align="center" colSpan={5}>
                        <div className="flex justify-evenly items-center">
                          <button
                            onClick={() => Add(category.id)}
                            className="text-green-500"
                          >
                            <AddOutlined />
                          </button>
                          <button
                            onClick={() => Edit(category.id)}
                            className="text-blue-500"
                          >
                            <EditOutlined />
                          </button>
                          <button
                            onClick={() => Delete(category.id)}
                            className="text-red-500"
                          >
                            <DeleteForeverOutlined />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse
                          in={cat.id === category.id && cat.open === true}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ margin: 1 }}>
                            <Table size="medium" aria-label="parents">
                              <TableHead>
                                <TableRow>
                                  <TableCell></TableCell>
                                  <TableCell>
                                    <p className="font-bold">Parent Name</p>
                                  </TableCell>
                                  <TableCell align="left">
                                    <p className="font-bold">Description</p>
                                  </TableCell>
                                  <TableCell align="center"></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {parents.map(
                                  (parent) =>
                                    parent.CategoryId == category.id && (
                                      <>
                                        <TableRow key={parent.id}>
                                          <TableCell>
                                            <IconButton
                                              aria-label="expand row"
                                              size="small"
                                              onClick={() =>
                                                parDropDown(parent.id)
                                              }
                                            >
                                              {par.id === parent.id &&
                                              par.open ? (
                                                <KeyboardArrowUpIcon />
                                              ) : (
                                                <KeyboardArrowDownIcon />
                                              )}
                                            </IconButton>
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                            {parent.name}
                                          </TableCell>
                                          <TableCell>
                                            {parent.description}
                                          </TableCell>
                                          <TableCell align="center">
                                            <div className="flex justify-evenly items-center">
                                              <button
                                                className="text-green-500"
                                                onClick={() =>
                                                  Add(category.id, parent.id)
                                                }
                                              >
                                                <AddOutlined />
                                              </button>
                                              <button
                                                onClick={() =>
                                                  Edit(category.id, parent.id)
                                                }
                                                className="text-blue-500"
                                              >
                                                <EditOutlined />
                                              </button>
                                              <button
                                                onClick={() =>
                                                  Delete(category.id, parent.id)
                                                }
                                                className="text-red-500"
                                              >
                                                <DeleteForeverOutlined />
                                              </button>
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell
                                            style={{
                                              paddingBottom: 0,
                                              paddingTop: 0,
                                            }}
                                            colSpan={6}
                                          >
                                            <Collapse
                                              in={
                                                par.id === parent.id &&
                                                par.open === true
                                              }
                                              timeout="auto"
                                              unmountOnExit
                                            >
                                              <Box sx={{ margin: 1 }}>
                                                <Table
                                                  size="medium"
                                                  aria-label="parents"
                                                >
                                                  <TableHead>
                                                    <TableRow>
                                                      <TableCell></TableCell>
                                                      <TableCell>
                                                        <p className="font-bold">
                                                          Child Name
                                                        </p>
                                                      </TableCell>
                                                      <TableCell align="left">
                                                        <p className="font-bold">
                                                          Description
                                                        </p>
                                                      </TableCell>
                                                      <TableCell align="center"></TableCell>
                                                    </TableRow>
                                                  </TableHead>
                                                  <TableBody>
                                                    {children.map(
                                                      (child) =>
                                                        child.ParentId ==
                                                          parent.id && (
                                                          <>
                                                            <TableRow
                                                              key={child.id}
                                                            >
                                                              <TableCell>
                                                                <IconButton
                                                                  aria-label="expand row"
                                                                  size="small"
                                                                  onClick={() =>
                                                                    childDropDown(
                                                                      child.id
                                                                    )
                                                                  }
                                                                >
                                                                  {chi.id ===
                                                                    child.id &&
                                                                  chi.open ? (
                                                                    <KeyboardArrowUpIcon />
                                                                  ) : (
                                                                    <KeyboardArrowDownIcon />
                                                                  )}
                                                                </IconButton>
                                                              </TableCell>
                                                              <TableCell
                                                                component="th"
                                                                scope="row"
                                                              >
                                                                {child.name}
                                                              </TableCell>
                                                              <TableCell>
                                                                {
                                                                  child.description
                                                                }
                                                              </TableCell>
                                                              <TableCell align="center">
                                                                <div className="flex justify-evenly items-center">
                                                                  <button
                                                                    className="text-green-500"
                                                                    onClick={() =>
                                                                      Add(
                                                                        category.id,
                                                                        parent.id,
                                                                        child.id
                                                                      )
                                                                    }
                                                                  >
                                                                    <AddOutlined />
                                                                  </button>
                                                                  <button
                                                                    onClick={() =>
                                                                      Edit(
                                                                        category.id,
                                                                        parent.id,
                                                                        child.id
                                                                      )
                                                                    }
                                                                    className="text-blue-500"
                                                                  >
                                                                    <EditOutlined />
                                                                  </button>
                                                                  <button
                                                                    onClick={() =>
                                                                      Delete(
                                                                        category.id,
                                                                        parent.id,
                                                                        child.id
                                                                      )
                                                                    }
                                                                    className="text-red-500"
                                                                  >
                                                                    <DeleteForeverOutlined />
                                                                  </button>
                                                                </div>
                                                              </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                              <TableCell
                                                                style={{
                                                                  paddingBottom: 0,
                                                                  paddingTop: 0,
                                                                }}
                                                                colSpan={6}
                                                              >
                                                                <Collapse
                                                                  in={
                                                                    chi.id ===
                                                                      child.id &&
                                                                    chi.open ===
                                                                      true
                                                                  }
                                                                  timeout="auto"
                                                                  unmountOnExit
                                                                >
                                                                  <Box
                                                                    sx={{
                                                                      margin: 1,
                                                                    }}
                                                                  >
                                                                    <Table
                                                                      size="medium"
                                                                      aria-label="parents"
                                                                    >
                                                                      <TableHead>
                                                                        <TableRow>
                                                                          <TableCell>
                                                                            <p className="font-bold">
                                                                              Item
                                                                              Name
                                                                            </p>
                                                                          </TableCell>
                                                                          <TableCell>
                                                                            <p className="font-bold">
                                                                              Brand
                                                                              Name
                                                                            </p>
                                                                          </TableCell>
                                                                          <TableCell>
                                                                            <p className="font-bold">
                                                                              Model
                                                                            </p>
                                                                          </TableCell>
                                                                          <TableCell>
                                                                            <p className="font-bold">
                                                                              Quantity
                                                                            </p>
                                                                          </TableCell>
                                                                          <TableCell>
                                                                            <p className="font-bold">
                                                                              Price
                                                                            </p>
                                                                          </TableCell>
                                                                          <TableCell align="left">
                                                                            <p className="font-bold">
                                                                              Description
                                                                            </p>
                                                                          </TableCell>
                                                                          <TableCell align="center"></TableCell>
                                                                        </TableRow>
                                                                      </TableHead>
                                                                      <TableBody>
                                                                        {items.map(
                                                                          (
                                                                            item
                                                                          ) => {
                                                                            return (
                                                                              item.ChildId ===
                                                                                child.id && (
                                                                                <TableRow
                                                                                  key={
                                                                                    item.id
                                                                                  }
                                                                                >
                                                                                  <TableCell
                                                                                    component="th"
                                                                                    scope="row"
                                                                                  >
                                                                                    {
                                                                                      item.name
                                                                                    }
                                                                                  </TableCell>
                                                                                  <TableCell>
                                                                                    {
                                                                                      item.brand
                                                                                    }
                                                                                  </TableCell>
                                                                                  <TableCell>
                                                                                    {
                                                                                      item.model
                                                                                    }
                                                                                  </TableCell>
                                                                                  <TableCell>
                                                                                    {
                                                                                      item.quantity
                                                                                    }
                                                                                  </TableCell>
                                                                                  <TableCell>
                                                                                    {
                                                                                      item.price
                                                                                    }
                                                                                  </TableCell>
                                                                                  <TableCell>
                                                                                    {
                                                                                      item.description
                                                                                    }
                                                                                  </TableCell>
                                                                                  <TableCell align="center">
                                                                                    <div className="flex justify-evenly items-center">
                                                                                      <button
                                                                                        onClick={() =>
                                                                                          Edit(
                                                                                            category.id,
                                                                                            parent.id,
                                                                                            child.id,
                                                                                            item.id
                                                                                          )
                                                                                        }
                                                                                        className="text-blue-500"
                                                                                      >
                                                                                        <EditOutlined />
                                                                                      </button>
                                                                                      <button
                                                                                        onClick={() =>
                                                                                          Delete(
                                                                                            category.id,
                                                                                            parent.id,
                                                                                            child.id,
                                                                                            item.id
                                                                                          )
                                                                                        }
                                                                                        className="text-red-500"
                                                                                      >
                                                                                        <DeleteForeverOutlined />
                                                                                      </button>
                                                                                    </div>
                                                                                  </TableCell>
                                                                                </TableRow>
                                                                              )
                                                                            );
                                                                          }
                                                                        )}
                                                                      </TableBody>
                                                                    </Table>
                                                                  </Box>
                                                                </Collapse>
                                                              </TableCell>
                                                            </TableRow>
                                                          </>
                                                        )
                                                    )}
                                                  </TableBody>
                                                </Table>
                                              </Box>
                                            </Collapse>
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    )
                                )}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>

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
