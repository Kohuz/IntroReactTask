import {
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ConstantSymbolOption } from "../common/types";
import axios from "../common/axios";

function ConstantSymbolsDialog({
  open,

  handleClose,
  onSelect,
}: {
  open: boolean;
  handleClose: () => void;
  onSelect: (symbol: ConstantSymbolOption) => void;
}) {
  const handleRowClick = (symbol: ConstantSymbolOption) => {
    onSelect(symbol);
    handleClose();
  };

  const [constantSymbols, setConstantSymbols] = useState<
    ConstantSymbolOption[]
  >([]);

  useEffect(() => {
    axios
      .get(`/code-table/constant-symbols`)
      .then((response) => {
        setConstantSymbols(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Dialog onClose={handleClose} open={open}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h4">Popis</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h4">Hodnota</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {constantSymbols.map((symbol: ConstantSymbolOption) => (
              <TableRow
                key={symbol.value}
                onClick={() => handleRowClick(symbol)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>
                  <Typography variant="h6">{symbol.text}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{symbol.value}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}

export default ConstantSymbolsDialog;
