import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { AddLocation } from "../components/AddLocation/AddLocation";
import { CurrentLocationButton } from "../components/CurrentLocationButton/CurrentLocationButton";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarGroup, defineStyle } from "@chakra-ui/react";
import { useState } from "react";
import { Api } from "@/api/api";
import { useGroupedWorkPlaces } from "../hooks/useGroupedWorkPlaces";

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
});

function getRandomColorPalette() {
  const colorPalettes = ["blue", "green", "red", "purple", "orange", "yellow"];
  return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
}

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

  const groupedWorkPlaces = useGroupedWorkPlaces(data?.data.workPlaces);

  return (
    <>
      <Map center={mapCenter} style={{ width: "100%", height: "100vh" }}>
        {groupedWorkPlaces.map((group) => {
          return (
            <CustomOverlayMap
              key={group.key}
              clickable
              position={{
                lat: group.latitude ?? 0,
                lng: group.longitude ?? 0,
              }}
            >
              <AvatarGroup gap="0" spaceX="-4" size="lg">
                {group.workplaces.map((workplace) => {
                  return (
                    <Avatar.Root
                      colorPalette={getRandomColorPalette()}
                      key={workplace.id}
                      size="sm"
                      css={ringCss}
                      onClick={() => {
                        console.log(workplace);
                      }}
                    >
                      <Avatar.Fallback name={workplace.creator?.name} />
                      <Avatar.Image src={workplace.creator?.profileImage} />
                    </Avatar.Root>
                  );
                })}
              </AvatarGroup>
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
