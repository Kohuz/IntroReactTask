import {
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { StandingOrderListType } from "../common/types";
import { toggleOrderSelection } from "@/store/selectedOrdersSlice";
import { formatCurrency } from "../common/utils";
import Link from "next/link";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

function StandingOrderComponent({
  order,
  onDeleteOrder,
  index,
}: {
  order: StandingOrderListType;
  onDeleteOrder: (id: number) => void;
  index: number;
}) {
  const href = `/order/${order.standingOrderId}`;
  const dispatch: AppDispatch = useDispatch();
  const selectedOrders = useSelector(
    (state: RootState) => state.selectedOrders.selectedOrders
  );
  const isItemSelected = selectedOrders.includes(order.standingOrderId);

  const handleCheckboxClick = () => {
    dispatch(toggleOrderSelection(order));
  };
  return (
    <TableRow
      sx={{
        backgroundColor: index % 2 !== 0 ? "white" : "lightgray",
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          onChange={handleCheckboxClick}
        />
      </TableCell>
      <TableCell sx={{ borderRight: "2px solid grey" }}>
        <Typography variant="h4">
          {new Date(order.nextRealizationDate).toLocaleDateString("cs-CZ", {
            day: "2-digit",
            month: "short",
          })}
        </Typography>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">{order.name.toUpperCase()}</Typography>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography>{order.accountNumber}</Typography>

              <Chip color="primary" label={order.interval} size="small"></Chip>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              ml: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{ mb: 1, height: "fit-content" }}
              href={href}
              LinkComponent={Link}
            >
              Upravit
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ height: "fit-content" }}
              onClick={() => onDeleteOrder(order.standingOrderId)}
            >
              Smazat
            </Button>
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={{ borderLeft: "2px solid grey" }}>
        <Typography variant="h6">{formatCurrency(order.amount)}</Typography>
      </TableCell>
    </TableRow>
  );
}

export default StandingOrderComponent;
