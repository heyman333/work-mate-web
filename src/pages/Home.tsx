import { Box } from "@chakra-ui/react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function Home() {
  return (
    <Box bg="white" display="flex" w="full" h="full">
      <Map
        center={{ lat: 37.394946, lng: 127.110828 }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <MapMarker position={{ lat: 37.394946, lng: 127.110828 }}>
          <div style={{ color: "#000" }}>판교역</div>
        </MapMarker>
      </Map>
    </Box>
  );
}

export default Home;
