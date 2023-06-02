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
            <Table aria-label="table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <h1 className="text-lg ">Name</h1>
                  </TableCell>
                  <TableCell>
                    <h1 className="text-lg ">Description</h1>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category, index) => (
                  <>
                    <TableRow
                      key={category.name}
                      sx={{ "& > *": { borderBottom: "unset" } }}
                    >
                      <TableCell score="row">{++index}</TableCell>
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
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleClick(category.id)}
                        >
                          {catId.id === category.id && catId.open ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse
                          in={catId.id === category.id && catId.open === true}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Parents</TableCell>
                                  <TableCell align="left">Details</TableCell>
                                  <TableCell align="center"></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {parents.map(
                                  (parent) =>
                                    parent.CategoryId == category.id && (
                                      <TableRow key={parent.id}>
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
