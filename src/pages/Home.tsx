import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { AddLocation } from "../components/AddLocation/AddLocation";
import { CurrentLocationButton } from "../components/CurrentLocationButton/CurrentLocationButton";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarGroup, defineStyle, Dialog } from "@chakra-ui/react";
import { useState } from "react";
import { Api } from "@/api/api";
import { useGroupedWorkPlaces } from "../hooks/useGroupedWorkPlaces";
import { CreatorModal } from "../components/CreatorModal/CreatorModal";
import { type GetWorkplaceData } from "../api/api";

type WorkPlace = NonNullable<GetWorkplaceData["workPlaces"]>[number];

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
});

function Home() {
  const [mapCenter, setMapCenter] = useState({
    lat: 37.394946,
    lng: 127.110828,
  });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    workplaces: WorkPlace[];
    initialIndex: number;
  }>({
    isOpen: false,
    workplaces: [],
    initialIndex: 0,
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

  const handleAvatarClick = (
    workplace: WorkPlace,
    groupWorkplaces: WorkPlace[]
  ) => {
    const initialIndex = groupWorkplaces.findIndex(
      (w) => w.id === workplace.id
    );
    setModalState({
      isOpen: true,
      workplaces: groupWorkplaces,
      initialIndex: initialIndex >= 0 ? initialIndex : 0,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      workplaces: [],
      initialIndex: 0,
    });
  };

  const groupedWorkPlaces = useGroupedWorkPlaces(data?.data.workPlaces);

  return (
    <Dialog.Root
      open={modalState.isOpen}
      size="md"
      onOpenChange={({ open }) => {
        setModalState((state) => ({
          ...state,
          isOpen: open,
        }));
      }}
    >
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
                    <Dialog.Trigger asChild key={workplace.id}>
                      <Avatar.Root
                        colorPalette={workplace.colorPalette}
                        key={workplace.id}
                        size="sm"
                        css={ringCss}
                        onClick={() => {
                          handleAvatarClick(workplace, group.workplaces);
                        }}
                      >
                        <Avatar.Fallback name={workplace.creator?.name} />
                        <Avatar.Image src={workplace.creator?.profileImage} />
                      </Avatar.Root>
                    </Dialog.Trigger>
                  );
                })}
              </AvatarGroup>
            </CustomOverlayMap>
          );
        })}
      </Map>
      <AddLocation />
      <CurrentLocationButton onLocationUpdate={handleLocationUpdate} />
      <CreatorModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        workplaces={modalState.workplaces}
        initialIndex={modalState.initialIndex}
      />
    </Dialog.Root>
  );
}

export default Home;
