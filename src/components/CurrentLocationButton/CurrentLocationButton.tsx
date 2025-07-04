import { Button } from "@chakra-ui/react";
import { FaLocationArrow } from "react-icons/fa";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";

interface CurrentLocationButtonProps {
  onLocationUpdate: (lat: number, lng: number) => void;
}

export const CurrentLocationButton = ({
  onLocationUpdate,
}: CurrentLocationButtonProps) => {
  const { location, loading, getCurrentLocation } = useCurrentLocation();

  const handleLocationClick = () => {
    if (location) {
      onLocationUpdate(location.latitude, location.longitude);
    } else {
      getCurrentLocation();
    }
  };

  return (
    <Button
      position="fixed"
      bottom="6"
      right="6"
      size="lg"
      zIndex={1000}
      colorScheme="blue"
      borderRadius="full"
      width="46px"
      height="46px"
      onClick={handleLocationClick}
      disabled={loading}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
    >
      <FaLocationArrow />
    </Button>
  );
};
