import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import photoSearch from "../pages/api/photoSearch";

const ResultCard = (props: { text: string; location: string }) => {
  const [image, setImage] = useState("");

  const bannedWords = [
    "Take",
    "Explore",
    "Ride",
    "Enjoy",
    "Visit",
    "Climb",
    "Walk",
    "Go",
    "Stroll",
    "Along",
    "And",
    "I",
  ];

  useEffect(() => {
    (async () => {
      // Guard against trying to find image with no input
      if (!props.text || props.text.length === 0) return;
      // Find capitalized words
      const match = /[A-Z]+[a-z]*/g;
      let properNouns = props.text.match(match) || [];
      const matchedWords =
        properNouns.filter((word) => !bannedWords.includes(word)) || [];
      if (matchedWords.length === 0) {
        matchedWords;
      }
      // Fallback to the whole phrase if there are no proper nouns in the sentence.
      const queryString =
        matchedWords.length > 0
          ? matchedWords.join(" ") + "" + props.location
          : props.text;
      const res = await photoSearch(queryString);
      if (!res.response?.results?.length) return;
      //@ts-ignore
      setImage(res.response?.results[0].urls.small);
    })();
  }, [props.text]);

  return (
    <Card
      direction="row"
      overflow="hidden"
      variant="outline"
      height={[90, 100, 130]}
    >
      <Box width={[120, 150, 200]} height="100%" bg="blue">
        <Image
          src={image || "/default-image.jpg"}
          alt=""
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
        />
      </Box>
      <CardBody>
        <Text>{props.text}</Text>
      </CardBody>
    </Card>
  );
};

export default ResultCard;
