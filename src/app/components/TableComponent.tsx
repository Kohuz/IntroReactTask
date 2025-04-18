import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  StandingOrdersArrayProps,
  StandingOrderListType,
} from "../common/types";
import StandingOrderComponent from "./StandingOrderComponent";
import TableFooter from "./TableFooter";
import axios from "../common/axios";
import Link from "next/link";
import ConfirmActionDialog from "./ConfirmActionDialog";

function TableComponent() {
  const STANDING_ORDER_URL = "standingOrder";
  const [standingOrders, setStandingOrders] =
    useState<StandingOrderListType[]>();
  const [error, setError] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [coordinates, setCoordinates] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [id, setId] = useState<number>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const visibleRows = useMemo(
    () =>
      standingOrders
        ?.sort(
          (a, b) =>
            new Date(a.nextRealizationDate).getTime() -
            new Date(b.nextRealizationDate).getTime()
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [standingOrders, page, rowsPerPage]
  );

  const fetchData = () => {
    axios
      .get(STANDING_ORDER_URL, {})
      .then((response) => {
        setStandingOrders(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };
  const handleConfirm = (pin: string) => {
    axios
      .post(
        `/grid-card/validate`,
        { pin: pin, coordinate: coordinates },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        axios
          .delete(`${STANDING_ORDER_URL}/${id}`)
          .then(() => {
            setStandingOrders(
              standingOrders?.filter((order) => order.standingOrderId !== id)
            );
            setDialogOpen(false);
            setCoordinates("");
            alert("Příkaz úspěšně smazán");
          })
          .catch((error) => alert("Error"));
      })
      .catch((error) => {
        alert("Failed to validate pin. Please try again.");
        console.log(error);
      });
  };

  const pinInit = () => {
    axios
      .get(`/grid-card/init`)
      .then((response) => {
        setCoordinates(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setDialogOpen(true);
  };

  const handleDeleteOrder = (id: number) => {
    setId(id);
    pinInit();
  };

  useEffect(fetchData, []);
  return (
    <Box
      sx={{
        margin: "20px 350px",
        border: "2px solid lightgrey",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "lightblue",
          height: "70px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          href={"/order/new"}
          LinkComponent={Link}
          sx={{ margin: "10px 5px" }}
        >
          Vytvořit nový příkaz
        </Button>
      </Box>
      <Box sx={{ padding: "16px" }}>
        <TableContainer sx={{ border: "2px solid grey" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: "2px solid grey",
                  }}
                >
                  <Typography variant="h4">Datum</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h4">Název</Typography>
                </TableCell>
                <TableCell sx={{ borderLeft: "2px solid grey" }}>
                  <Typography variant="h4">Hodnota</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows?.map(
                (order: StandingOrderListType, index: number) => (
                  <StandingOrderComponent
                    key={order.standingOrderId}
                    order={order}
                    onDeleteOrder={handleDeleteOrder}
                    index={index}
                  />
                )
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={standingOrders?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      <TableFooter orders={standingOrders}></TableFooter>
      <ConfirmActionDialog
        open={dialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        coordinates={coordinates}
      />
    </Box>
  );
}

export default TableComponent;
