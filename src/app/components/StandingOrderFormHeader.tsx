import { Box, Typography } from "@mui/material";
import React from "react";

function StandingOrderFormHeader({ text }: { text: string }) {
  return (
    <Box sx={{ backgroundColor: "lightblue", marginBottom: "10px" }}>
      <Typography variant="h4" sx={{ padding: "15px 12px" }}>
        {text}
      </Typography>
    </Box>
  );
}

export default StandingOrderFormHeader;
