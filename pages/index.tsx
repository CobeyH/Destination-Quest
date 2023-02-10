import {
  Box,
  Button,
  ChakraProvider,
  IconButton,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import CityField from "../components/CityField";
import ResultsDisplay from "../components/ResultsDisplay";

import Head from "next/head";
import { useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import FilterButtons from "../components/FilterButton";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [result, setResult] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [tagKeys, setTagKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    setResult("");

    try {
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
      setLoading(false);
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      setLoading(false);
    }
  }

  const testData =
    "1. Visit the Butchart Gardens 2. Take a whale-watching tour 3. Explore the Royal BC Museum 4. Visit the Parliament Buildings 5. Take a stroll along the Inner Harbour 6. Visit the Craigdarroch Castle 7. Go for a hike in the Sooke Hills 8. Take a ferry ride to the Gulf Islands 9. Explore the Chinatown district 10. Visit the Art Gallery of Greater Victoria";

  return (
    <ChakraProvider>
      <Head>
        <title>Destination Quest</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <Box m="5%">
        <IconButton
          icon={colorMode === "light" ? <BsFillMoonFill /> : <BsFillSunFill />}
          onClick={toggleColorMode}
          aria-label={"color-mode-switch"}
        />
        <Text fontSize="2xl">Enter City</Text>
        <CityField setCity={setCityInput} city={cityInput} />
        <FilterButtons tagKeys={tagKeys} setTagKeys={setTagKeys} />
        <Button m="3" onClick={onSubmit} isDisabled={cityInput.length < 5}>
          {loading ? <Spinner pt="1" mr="2" /> : null}
          Search
        </Button>
        <ResultsDisplay result={result} location={cityInput} />
      </Box>
    </ChakraProvider>
  );
}
