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
import Children from "./Children";

export default function Parents({
  data,
  category,
  par,
  chi,
  parDropDown,
  childDropDown,
}) {
  const parents = data[1];

  const { Add, Edit, Delete } = useFunctionsContext();
  return (
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
                      onClick={() => parDropDown(parent.id)}
                    >
                      {par.id === parent.id && par.open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parent.name}
                  </TableCell>
                  <TableCell>{parent.description}</TableCell>
                  <TableCell align="center">
                    {(par.id !== parent.id || !par.open) && (
                      <div className="flex justify-evenly items-center">
                        <button
                          className="text-green-500"
                          onClick={() => Add("children", category.id, parent.id)}
                        >
                          <AddOutlined />
                        </button>
                        <button
                          onClick={() => Edit(category.id, parent.id)}
                          className="text-blue-500"
                        >
                          <EditOutlined />
                        </button>
                        <button
                          onClick={() => Delete(category.id, parent.id)}
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
                      in={par.id === parent.id && par.open === true}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Children
                          data={data}
                          category={category}
                          parent={parent}
                          chi={chi}
                          childDropDown={childDropDown}
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
