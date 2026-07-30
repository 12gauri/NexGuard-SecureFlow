import React from "react";
import {
  Box,
  CircularProgress,
  Stack
} from "@mui/material";


const Loader = () => (

  <Box sx={{ minHeight: "100vh" }}>

    <Stack
      direction="row"
      sx={{
        justifyContent:"center",
        alignItems:"center",
      }}
      height="80vh"
    >

      <CircularProgress />

    </Stack>

  </Box>

);


export default Loader;
