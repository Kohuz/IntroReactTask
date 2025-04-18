import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header style={{ backgroundColor: "lightblue", margin: 0 }}>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">Přehled trvalých příkazů</Typography>
          <Typography variant="subtitle1">
            Trvalé příkazy jsou ideální, když potřebujete pravidelně posílat
            platby ve stejné výši. Tady je můžete upravovat nebo vytvářet nové
          </Typography>
        </Box>
      </Box>
    </header>
  );
}

export default Header;
