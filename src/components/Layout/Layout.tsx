import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import LeftNav from "../LeftNav/LeftNav";

function Layout() {
  return (
    <Box bg="white" display="flex" w="full" h="100vh">
      <LeftNav />
      <Box flex="1">
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;