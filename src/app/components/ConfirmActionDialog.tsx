import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../common/axios";

const validationSchema = Yup.object().shape({
  pin: Yup.string().required("PIN kód je povinný"),
});

function ConfirmActionDialog({
  open,
  onClose,
  onConfirm,
  coordinates,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (pin: string, id?: number) => void;
  coordinates: string;
}) {
  const handleSubmit = (values: { pin: string }) => {
    onConfirm(values.pin);
  };

  const formik = useFormik({
    initialValues: { pin: "" },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Zadejte PIN kód na řádku č. {coordinates.toString()[0]} a sloupci č.{" "}
        {coordinates.toString()[1]}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            id="pin"
            name="pin"
            label="PIN kód *"
            variant="outlined"
            value={formik.values.pin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pin && Boolean(formik.errors.pin)}
            helperText={formik.touched.pin && formik.errors.pin}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error" variant="contained">
            Zrušit
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Potvrdit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ConfirmActionDialog;
