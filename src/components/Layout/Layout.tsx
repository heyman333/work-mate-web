import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import LeftNav from "../LeftNav/LeftNav";
import { MobileNotSupported } from "../MobileNotSupported/MobileNotSupported";

function Layout() {
  return (
    <Box bg="white" display="flex" w="full" h="100vh">
      <LeftNav />
      <Box flex="1">
        <Outlet />
      </Box>
      <MobileNotSupported />
    </Box>
  );
}

export default Layout;
