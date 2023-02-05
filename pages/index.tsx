import {
  Button,
  Text,
  ChakraProvider,
  Input,
  Container,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [cityInput, setCityInput] = useState("");

  const [result, setResult] = useState();

  async function onSubmit(event) {
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
      console.log(data.result);

      setResult(data.result);
      setCityInput("");
    } catch (error) {
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

      <main>
        <Text fontSize="6xl">City Search</Text>
        <Text fontSize="2xl">Enter City</Text>
        <Input
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="City Name"
          size="sm"
        />
        <Button mt="3" onClick={onSubmit}>
          Submit
        </Button>
        <Container>{result}</Container>
      </main>
    </ChakraProvider>
  );
}
