import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { Product } from "../../../assets/types/Products";
import "./adminAllProduct.scss";
const rows = JSON.parse(localStorage.getItem("products") || "[]");

const headCells = [
  { id: "name", label: "Product Name" },
  { id: "price", label: "Price" },
  { id: "category", label: "Category" },
  { id: "quantity", label: "Quantity" },
  { id: "brand", label: "Brand" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions" },
];

const handleDelete = (id: number) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this product!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, keep it",
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedProducts = rows.filter(
        (product: Product) => product.id !== id
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      Swal.fire("Deleted!", "Your product has been deleted.", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  });
};

export default function ProductTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState<readonly number[]>([]);

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    console.log("TCL: handleClick -> event", event);
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log("TCL: handleChangePage -> event", event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage]
  );

  return (
    <>
      <h3>General Information</h3>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">ID</TableCell>
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align="left">
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row: Product) => {
                  const isItemSelected = selected.indexOf(row.id!) !== -1;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id!)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <TableCell>{row.id}</TableCell>
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.price?.toLocaleString()}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.brand}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row.id!);
                          }}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={headCells.length} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
