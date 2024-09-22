import React, { ReactElement } from "react";
import {
  Select,
  MenuItem,
  Box,
  TableContainer,
  Table,
  Paper,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Typography,
} from "@mui/material";

// Define types for column and row data
interface TableColumn {
  name: string;
  type: string;
}

interface DataGridProps {
  column: TableColumn[];
  row: any[][];
}

export default function DataTable({
  column,
  row,
}: DataGridProps): ReactElement {
  return (
    <TableContainer
      component={Paper}
      sx={{ border: "1px solid #ede7e7", borderRadius: "3px" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {/* Table Header */}
        <TableHead>
          <TableRow>
            {column.map(({ type, name }) => (
              <TableCell key={name}>
                <Typography fontWeight={600}>{name}</Typography>
                <Box>{type}</Box>{" "}
                {/* Remove this if type is not required for display */}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {row.map((item, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {item.map((el, index) => (
                <TableCell key={index} component="th" scope="row">
                  {el}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
