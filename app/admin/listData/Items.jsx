"use client";

import React from "react";

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
import { useFunctionsContext } from "../List";

export default function Items({ data, category, parent, child }) {
  const items = data[3];

  const { Add, Edit, Delete } = useFunctionsContext();
  return (
    <Table size="medium" aria-label="parents">
      <TableHead>
        <TableRow>
          <TableCell>
            <p className="font-bold">Item Name</p>
          </TableCell>
          <TableCell>
            <p className="font-bold">Brand Name</p>
          </TableCell>
          <TableCell>
            <p className="font-bold">Model</p>
          </TableCell>
          <TableCell>
            <p className="font-bold">Quantity</p>
          </TableCell>
          <TableCell>
            <p className="font-bold">Price</p>
          </TableCell>
          <TableCell align="left">
            <p className="font-bold">Description</p>
          </TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => {
          return (
            item.ChildId === child.id && (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-evenly items-center">
                    <button
                      onClick={() =>
                        Edit(category.id, parent.id, child.id, item.id)
                      }
                      className="text-blue-500"
                    >
                      <EditOutlined />
                    </button>
                    <button
                      onClick={() =>
                        Delete(category.id, parent.id, child.id, item.id)
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
        })}
      </TableBody>
    </Table>
  );
}
