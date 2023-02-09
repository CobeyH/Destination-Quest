import { Box, Button, ChakraProvider, Text } from "@chakra-ui/react";
import CityField from "../components/CityField";
import ResultsDisplay from "../components/ResultsDisplay";

import Head from "next/head";
import { useEffect, useState } from "react";
import FilterButtons from "../components/FilterButton";

export default function Home() {
  const [result, setResult] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [tagKeys, setTagKeys] = useState<string[]>([]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  async function onSubmit(event: any) {
    event.preventDefault();

    try {
      console.log("Making API request");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: cityInput, filters: tagKeys }),
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
        <title>Destination Quest</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <Box m="5%">
        <Text fontSize="6xl">City Search</Text>
        <Text fontSize="2xl">Enter City</Text>
        <CityField setCity={setCityInput} city={cityInput} />
        <FilterButtons tagKeys={tagKeys} setTagKeys={setTagKeys} />
        <Button m="3" onClick={onSubmit} isDisabled={cityInput.length < 5}>
          Search
        </Button>
        <ResultsDisplay result={result} />
      </Box>
    </ChakraProvider>
  );
}
