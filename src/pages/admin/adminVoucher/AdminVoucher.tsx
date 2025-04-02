import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { discountCodes } from "../../../constants/discounCode";
import { IDiscountCode } from "../../../assets/types/Discount";
import "./_adminVoucher.scss";
import { PlusIcons } from "../../../assets/icons/Icons";

const schema = yup.object().shape({
  code: yup.string().required("Voucher code is required"),
  discountAmount: yup
    .number()
    .min(1, "Discount amount must be greater than 0")
    .required("Discount amount is required"),
  description: yup.string().required("Description is required"),
  minOrder: yup
    .number()
    .min(0, "Minimum order value must be greater than or equal to 0")
    .required("Minimum order value is required"),
  expiry: yup.string().required("Expiry date is required"),
});

const AdminVoucher: React.FC = () => {
  const [vouchersList, setVouchersList] = useState<IDiscountCode[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getNextWeekDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    setValue("expiry", getNextWeekDate());
    const savedVouchers = localStorage.getItem("vouchers");
    if (!savedVouchers) {
      localStorage.setItem("vouchers", JSON.stringify(discountCodes));
      setVouchersList(discountCodes);
    } else {
      setVouchersList(JSON.parse(savedVouchers));
    }
  }, [setValue]);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const onSubmit = (data: IDiscountCode) => {
    const updatedVouchers = [...vouchersList, data];
    setVouchersList(updatedVouchers);
    localStorage.setItem("vouchers", JSON.stringify(updatedVouchers));
    setOpenModal(false);
    Swal.fire({
      title: "Add voucher successfully!",
      icon: "success",
      confirmButtonText: "OK",
    });
    reset();
    setValue("expiry", getNextWeekDate());
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDeleteVoucher = (voucherCode: string) => {
    Swal.fire({
      title: "Are you sure you want to delete this voucher?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedVouchers = vouchersList.filter(
          (voucher) => voucher.code !== voucherCode
        );
        setVouchersList(updatedVouchers);
        localStorage.setItem("vouchers", JSON.stringify(updatedVouchers));
        Swal.fire("Deleted!", "Voucher has been deleted.", "success");
      }
    });
  };

  return (
    <div className="voucher-form">
      <div className="voucher-form__heading">
        <h2 className="voucher-form__title">Voucher List</h2>

        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          <PlusIcons></PlusIcons> <span>Add New</span>
        </Button>
      </div>

      {vouchersList.length === 0 ? (
        <div className="voucher-form__empty">
          <p>No vouchers available. Please add a new voucher.</p>
        </div>
      ) : (
        <TableContainer
          component={Paper}
          className="voucher-form__table-container"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Voucher Code</TableCell>
                <TableCell>Discount Amount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Minimum Order Value</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vouchersList.map((voucher, index) => (
                <TableRow key={index}>
                  <TableCell>{voucher.code}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {Number(voucher.discountAmount).toLocaleString("de-DE")} đ
                  </TableCell>
                  <TableCell sx={{ textAlign: "left" }}>
                    {voucher.description}
                  </TableCell>
                  <TableCell>
                    {Number(voucher.minOrder).toLocaleString("de-DE")} đ
                  </TableCell>
                  <TableCell>{voucher.expiry}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteVoucher(voucher.code)}
                      style={{ backgroundColor: "red" }}
                    >
                      <span>Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="voucher-form__modal-box">
          <h2>Add Voucher</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="voucher-form__body"
          >
            <div className="voucher-form__field">
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Voucher Code"
                    variant="outlined"
                    fullWidth
                    className="voucher-form__input"
                    error={!!errors.code}
                    helperText={errors.code ? errors.code.message : ""}
                  />
                )}
              />
            </div>

            <div className="voucher-form__field">
              <Controller
                name="discountAmount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Discount Amount"
                    variant="outlined"
                    type="number"
                    fullWidth
                    className="voucher-form__input"
                    error={!!errors.discountAmount}
                    helperText={
                      errors.discountAmount ? errors.discountAmount.message : ""
                    }
                  />
                )}
              />
            </div>

            <div className="voucher-form__field">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    className="voucher-form__input"
                    error={!!errors.description}
                    helperText={
                      errors.description ? errors.description.message : ""
                    }
                  />
                )}
              />
            </div>

            <div className="voucher-form__field">
              <Controller
                name="minOrder"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Minimum Order Value"
                    variant="outlined"
                    type="number"
                    fullWidth
                    className="voucher-form__input"
                    error={!!errors.minOrder}
                    helperText={errors.minOrder ? errors.minOrder.message : ""}
                  />
                )}
              />
            </div>

            <div className="voucher-form__field">
              <Controller
                name="expiry"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expiry Date"
                    variant="outlined"
                    type="date"
                    fullWidth
                    className="voucher-form__input"
                    error={!!errors.expiry}
                    helperText={errors.expiry ? errors.expiry.message : ""}
                  />
                )}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="voucher-form__submit"
            >
              Add Voucher
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminVoucher;
