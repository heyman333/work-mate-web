import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { AddLocation } from "../components/AddLocation/AddLocation";
import { CurrentLocationButton } from "../components/CurrentLocationButton/CurrentLocationButton";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@chakra-ui/react";
import { useState } from "react";
import { Api } from "@/api/api";

function Home() {
  const [mapCenter, setMapCenter] = useState({
    lat: 37.394946,
    lng: 127.110828,
  });

  const { data } = useQuery({
    queryKey: ["workplaces"],
    queryFn: () => {
      const workplace = new Api().workplace;
      return workplace.getWorkplace();
    },
  });

  const handleLocationUpdate = (lat: number, lng: number) => {
    setMapCenter({ lat, lng });
  };

  return (
    <>
      <Map center={mapCenter} style={{ width: "100%", height: "100vh" }}>
        {data?.data.workPlaces?.map((workplace) => {
          return (
            <CustomOverlayMap
              clickable
              position={{
                lat: workplace.latitude ?? 0,
                lng: workplace.longitude ?? 0,
              }}
            >
              <Avatar.Root
                size="sm"
                onClick={() => {
                  console.log(workplace);
                }}
              >
                <Avatar.Fallback name={workplace.creator?.name} />
                <Avatar.Image src={workplace.creator?.profileImage} />
              </Avatar.Root>
            </CustomOverlayMap>
          );
        })}
      </Map>
      <AddLocation />
      <CurrentLocationButton onLocationUpdate={handleLocationUpdate} />
    </>
  );
}

export default Home;
