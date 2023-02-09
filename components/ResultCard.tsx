import { Box, Text, Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import photoSearch from "../pages/api/photoSearch";

const ResultCard = (props: { text: string }) => {
  const [image, setImage] = useState("");

  const bannedWords = [
    "a",
    "the",
    "take",
    "explore",
    "ride",
    "enjoy",
    "visit",
    "climb",
    "walk",
  ];

  useEffect(() => {
    (async () => {
      let queryString = props.text.toLowerCase().split(" ");
      const matchedWords = queryString.filter(
        (word) => !bannedWords.includes(word)
      );
      if (queryString.length === 0) return;
      const res = await photoSearch(matchedWords.join(" "));

      //@ts-ignore
      setImage(res.response?.results[0].urls.thumb);
    })();
  }, [props.text]);

  return (
    <Card direction="row" overflow="hidden" variant="outline">
      <Image src={image} objectFit="cover" />
      <CardBody>
        <Text>{props.text}</Text>
      </CardBody>
    </Card>
  );
};

export default ResultCard;
