import { Box, Typography } from "@mui/material";
import React from "react";
import { StandingOrdersArrayProps } from "../common/types";
import { formatCurrency } from "../common/utils";
import { useAppSelector } from "@/store/store";

function TableFooter({ orders }: StandingOrdersArrayProps) {
  const totalSum = orders?.reduce((acc, order) => acc + order.amount, 0) ?? 0;
  const selectedOrdersId = useAppSelector((state) => state.selectedOrders);
  console.log(selectedOrdersId);

  return (
    <Box sx={{ backgroundColor: "lightblue" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          paddingLeft: "10%",
          paddingRight: "10%",

          margin: "0",
        }}
      >
        <Typography variant="h5">
          Počet trvalých příkazů: {selectedOrdersId.selectedOrders.length}
        </Typography>
        <Typography variant="h5">
          Celková suma: {formatCurrency(selectedOrdersId.selectedOrdersValue)}
        </Typography>
      </Box>
    </Box>
  );
}

export default TableFooter;
