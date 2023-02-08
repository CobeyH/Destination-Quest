import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  propNames,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { IoLocateSharp } from "react-icons/io5";

interface ReverseCodeResult {
  address: {
    village: string;
    country: string;
  };
}

const CityField = (props: {
  setCity: (city: string) => void;
  city: string;
}) => {
  const successCallback = (position: GeolocationPosition) => {
    const lat = position.coords.latitude.toString();
    const long = position.coords.longitude.toString();
    ReverseLookup(lat, long);
  };

  const ReverseLookup = (lat: String, long: String) => {
    return fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json&zoom=10`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response: ReverseCodeResult) => {
        const village = response.address.village;
        const country = response.address.country;
        props.setCity(village + ", " + country);
      });
  };

  const errorCallback = (error: GeolocationPositionError) => {
    console.log(error);
  };

  function getPosition() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  return (
    <InputGroup>
      <InputLeftElement>
        <IconButton
          aria-label="My-Location-Button"
          onClick={getPosition}
          icon={<IoLocateSharp />}
          variant="ghost"
          borderRadius={"10"}
        />
      </InputLeftElement>
      <Input
        value={props.city}
        onChange={(e) => props.setCity(e.target.value)}
        placeholder="City Name"
        borderRadius={"10"}
      />
    </InputGroup>
  );
};

export default CityField;
