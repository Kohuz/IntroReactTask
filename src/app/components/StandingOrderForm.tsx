"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, MenuItem, styled, TextField } from "@mui/material";
import { daysOfWeek, validationSchema } from "@/app/common/formik/orderForm";
import {
  PeriodicityOption,
  ConstantSymbolOption,
  StandingOrderDetailType,
  IntervalEnum,
} from "@/app/common/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Link from "next/link";
import axios from "../common/axios";
import ConstantSymbolsDialog from "./ConstantSymbolsDialog";

interface StandingOrderFormProps {
  initialValues: StandingOrderDetailType;
  onSubmit: (values: StandingOrderDetailType) => void;
}

const marginValues = "16px 0";
const StyledTextField = styled(TextField)({
  margin: marginValues,
  boxSizing: "border-box",
});

function StandingOrderForm({
  initialValues,
  onSubmit,
}: StandingOrderFormProps) {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const [periodicityOptions, setPeriodicityOptions] = useState<
    PeriodicityOption[]
  >([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    axios
      .get(`/code-table/intervals`)
      .then((response) => {
        setPeriodicityOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelectSymbol = (symbol: ConstantSymbolOption) => {
    formik.setFieldValue("constantSymbol", symbol.value);
  };

  return (
    <Box
      sx={{
        margin: "20px auto",
        padding: "20px",
        border: "2px solid lightgrey",
        maxWidth: "800px",
        boxSizing: "border-box",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <StyledTextField
          fullWidth
          id="name"
          name="name"
          label="Příjemce *"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <StyledTextField
          fullWidth
          id="accountNumber"
          name="accountNumber"
          label="IBAN *"
          value={formik.values.accountNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.accountNumber && Boolean(formik.errors.accountNumber)
          }
          helperText={
            formik.touched.accountNumber && formik.errors.accountNumber
          }
        />
        <StyledTextField
          fullWidth
          id="amount"
          name="amount"
          label="Suma *"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
        />
        <StyledTextField
          fullWidth
          id="variableSymbol"
          name="variableSymbol"
          label="Variabilní symbol *"
          value={formik.values.variableSymbol}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.variableSymbol &&
            Boolean(formik.errors.variableSymbol)
          }
          helperText={
            formik.touched.variableSymbol && formik.errors.variableSymbol
          }
        />
        <Box sx={{ display: "flex", gap: "5%" }}>
          <StyledTextField
            fullWidth
            id="constantSymbol"
            name="constantSymbol"
            label="Konstantní symbol *"
            value={formik.values.constantSymbol}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.constantSymbol &&
              Boolean(formik.errors.constantSymbol)
            }
            helperText={
              formik.touched.constantSymbol && formik.errors.constantSymbol
            }
            sx={{ flex: "0 0 55%" }}
          />
          <Button
            variant="outlined"
            onClick={() => setDialogOpen(true)}
            sx={{ flex: "0 0 40%", margin: marginValues }}
          >
            Konstantní symboly
          </Button>
          <ConstantSymbolsDialog
            open={dialogOpen}
            handleClose={handleClose}
            onSelect={handleSelectSymbol}
          />
        </Box>
        <StyledTextField
          fullWidth
          id="specificSymbol"
          name="specificSymbol"
          label="Specifický symbol *"
          value={formik.values.specificSymbol}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.specificSymbol &&
            Boolean(formik.errors.specificSymbol)
          }
          helperText={
            formik.touched.specificSymbol && formik.errors.specificSymbol
          }
        />
        <StyledTextField
          fullWidth
          id="note"
          name="note"
          label="Poznámka pro příjemce *"
          value={formik.values.note}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.note && Boolean(formik.errors.note)}
          helperText={formik.touched.note && formik.errors.note}
        />
        <Box sx={{ display: "flex", gap: "5%" }}>
          <StyledTextField
            select
            id="intervalId"
            name="intervalId"
            label="Periodicita"
            sx={{ flex: "0 1 55%" }}
            value={formik.values.intervalId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.intervalId && Boolean(formik.errors.intervalId)
            }
            helperText={formik.touched.intervalId && formik.errors.intervalId}
          >
            {periodicityOptions?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </StyledTextField>
          <StyledTextField
            select
            id="intervalSpecification"
            name="intervalSpecification"
            label="Den v týdnu"
            sx={{ flex: "0 1 40%" }}
            disabled={formik.values.intervalId !== IntervalEnum.WEEKLY}
            value={formik.values.intervalSpecification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.intervalSpecification &&
              Boolean(formik.errors.intervalSpecification)
            }
            helperText={
              formik.touched.intervalSpecification &&
              formik.errors.intervalSpecification
            }
          >
            {daysOfWeek.map((day, index) => (
              <MenuItem key={day} value={index}>
                {day}
              </MenuItem>
            ))}
          </StyledTextField>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Začátek platnosti"
              value={formik.values.validFrom}
              minDate={dayjs().add(1, "day")}
              onChange={(value) => formik.setFieldValue("validFrom", value)}
            />
          </LocalizationProvider>
          <Box>
            <Button color="primary" variant="contained" type="submit">
              Uložit
            </Button>
            <Button
              variant="contained"
              color="error"
              href={"/"}
              onClick={() => formik.resetForm()}
              LinkComponent={Link}
              sx={{ marginLeft: "16px" }}
            >
              Zahodit
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default StandingOrderForm;
