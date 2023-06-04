"use client";

import React from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
  AddOutlined,
  DeleteForeverOutlined,
  EditOutlined,
} from "@mui/icons-material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useFunctionsContext } from "../List";
import Parents from "./Parents";

export default function Categories({
  data,
  cat,
  par,
  chi,
  catDropDown,
  parDropDown,
  childDropDown,
}) {
  const categories = data[0];

  const { Add, Edit, Delete } = useFunctionsContext();

  return categories.map((category, index) => (
    <>
      <TableRow key={category.name} sx={{ "& > *": { borderBottom: "unset" } }}>
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
          {(cat.id !== category.id || !cat.open) && (
            <div className="flex justify-evenly items-center">
              <button
                onClick={() => Add("parents", category.id)}
                className="text-green-500"
              >
                <AddOutlined />
              </button>
              <button
                onClick={() => Edit("categories", category)}
                className="text-blue-500"
              >
                <EditOutlined />
              </button>
              <button
                onClick={() => Delete("categories", category)}
                className="text-red-500"
              >
                <DeleteForeverOutlined />
              </button>
            </div>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={cat.id === category.id && cat.open === true}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ margin: 1 }}>
              <Parents
                data={data}
                category={category}
                par={par}
                chi={chi}
                parDropDown={parDropDown}
                childDropDown={childDropDown}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  ));
}
