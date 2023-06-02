"use client";

import React, { useState, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
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
  const [catId, setCatId] = useState("");

  const categories = data[0];
  const parents = data[1];
  const children = data[2];
  const items = data[3];

  const Add = (e) => {
    // Show Add Modal
  };
  const Edit = (e) => {};
  const Delete = (e) => {};

  const handleClick = (id) => {
    setCatId(id);
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
                    {}
                    <TableRow
                      key={category.name}
                      sx={{ "& > *": { borderBottom: "unset" } }}
                    >
                      <TableCell score="row">{++index}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      {/* Buttons */}
                      <TableCell align="center">
                        <div className="flex justify-evenly items-center">
                          <button onClick={Add}>
                            <AddOutlined />
                          </button>
                          <button onClick={Edit}>
                            <EditOutlined />
                          </button>
                          <button onClick={Delete}>
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
                          {catId === category.id ? (
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
                          in={catId === category.id}
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
                                              className="text-green-600"
                                              onClick={Add}
                                            >
                                              <AddOutlined />
                                            </button>
                                            <button onClick={Edit}>
                                              <EditOutlined />
                                            </button>
                                            <button onClick={Delete}>
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
    </div>
  );
}
