"use client";

import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Categories from "@/app/admin/components/listData/Categories";

export default function ListTable({ data }) {
  const [cat, setCat] = useState({});
  const [par, setPar] = useState({});
  const [chi, setChi] = useState({});

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
            <Categories
              data={data}
              cat={cat}
              par={par}
              chi={chi}
              catDropDown={catDropDown}
              parDropDown={parDropDown}
              childDropDown={childDropDown}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
