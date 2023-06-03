"use client";

import React from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  AddOutlined,
  DeleteForeverOutlined,
  EditOutlined,
} from "@mui/icons-material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useFunctionsContext } from "../List";
import Items from "./Items";

export default function Children({
  data,
  category,
  parent,
  chi,
  childDropDown,
}) {
  const children = data[2];
  const items = data[3];

  const { Add, Edit, Delete } = useFunctionsContext();

  return (
    <Table size="medium" aria-label="parents">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <p className="font-bold">Child Name</p>
          </TableCell>
          <TableCell align="left">
            <p className="font-bold">Description</p>
          </TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {children.map(
          (child) =>
            child.ParentId == parent.id && (
              <>
                <TableRow key={child.id}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => childDropDown(child.id)}
                    >
                      {chi.id === child.id && chi.open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {child.name}
                  </TableCell>
                  <TableCell>{child.description}</TableCell>
                  <TableCell align="center">
                    {(chi.id !== child.id || !chi.open) && (
                      <div className="flex justify-evenly items-center">
                        <button
                          className="text-green-500"
                          onClick={() => Add("items", category.id, parent.id, child.id)}
                        >
                          <AddOutlined />
                        </button>
                        <button
                          onClick={() => Edit(category.id, parent.id, child.id)}
                          className="text-blue-500"
                        >
                          <EditOutlined />
                        </button>
                        <button
                          onClick={() =>
                            Delete(category.id, parent.id, child.id)
                          }
                          className="text-red-500"
                        >
                          <DeleteForeverOutlined />
                        </button>
                      </div>
                    )}
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
                      in={chi.id === child.id && chi.open === true}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box
                        sx={{
                          margin: 1,
                        }}
                      >
                        <Items
                          data={data}
                          category={category}
                          parent={parent}
                          child={child}
                        />
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            )
        )}
      </TableBody>
    </Table>
  );
}
