import { Map, MapMarker } from "react-kakao-maps-sdk";
import { AddLocation } from "../components/AddLocation/AddLocation";

function Home() {
  const handleAddLocation = (keyword: string) => {
    console.log("검색 키워드:", keyword);
  };

  return (
    <>
      <Map
        center={{ lat: 37.394946, lng: 127.110828 }}
        style={{ width: "100%", height: "100vh" }}
      >
        <MapMarker position={{ lat: 37.394946, lng: 127.110828 }}>
          <div style={{ color: "#000" }}>판교역</div>
        </MapMarker>
      </Map>
      <AddLocation onAddLocation={handleAddLocation} />
    </>
  );
}

export default Home;
