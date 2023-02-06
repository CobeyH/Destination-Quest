import {
  Button,
  Text,
  ChakraProvider,
  Input,
  Container,
  InputGroup,
  InputRightElement,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { IoLocateSharp } from "react-icons/io5";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [cityInput, setCityInput] = useState("");
  const [result, setResult] = useState();

  useEffect(() => {
    console.log(cityInput);
  }, [result]);

  const successCallback = (position: GeolocationPosition) => {
    console.log(position);
  };

  const errorCallback = (error: GeolocationPositionError) => {
    console.log(error);
  };

  function getPosition() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  async function onSubmit(event: any) {
    console.log("Button pressed");

    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: cityInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(data.result);
      setCityInput("");
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <ChakraProvider>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <Box m="5%">
        <Text fontSize="6xl">City Search</Text>
        <Text fontSize="2xl">Enter City</Text>
        <InputGroup>
          <Input
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="City Name"
            size="sm"
          />
          <InputRightElement>
            <IconButton
              aria-label="My-Location-Button"
              onClick={getPosition}
              icon={<IoLocateSharp />}
            ></IconButton>
          </InputRightElement>
        </InputGroup>
        <Button mt="3" onClick={onSubmit}>
          Submit
        </Button>
        <Container>{result}</Container>
      </Box>
    </ChakraProvider>
  );
}
