import { Box, Button, ChakraProvider, propNames, Text } from "@chakra-ui/react";
import CityField from "../components/CityField";
import ResultsDisplay from "../components/ResultsDisplay";

import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");
  const [cityInput, setCityInput] = useState("");

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

  const testData =
    "1. Visit the Great Pyramids of Giza and the Sphinx 2. Explore the Khan el-Khalili Bazaar 3. Take a Nile River Cruise 4. Visit the Egyptian Museum 5. Climb the Cairo Tower 6. Explore Islamic Cairo 7. Visit the Coptic Cairo 8. Take a camel ride in the desert 9. Visit the Citadel of Saladin 10. Enjoy a felucca ride on the Nile";

  return (
    <ChakraProvider>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <Box m="5%">
        <Text fontSize="6xl">City Search</Text>
        <Text fontSize="2xl">Enter City</Text>
        <CityField setCity={setCityInput} city={cityInput} />
        <Button m="3" onClick={onSubmit} isDisabled={cityInput.length < 5}>
          Search
        </Button>
        <ResultsDisplay result={testData} />
      </Box>
    </ChakraProvider>
  );
}
