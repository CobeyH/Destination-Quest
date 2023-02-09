import { Card, CardBody, Text } from "@chakra-ui/react";
import Image from "next/image";
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
    "go",
    "stroll",
    "along",
    "and",
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
    <Card direction="row" overflow="hidden" variant="outline" height={130}>
      <Image
        src={image || "/default-image.jpg"}
        alt=""
        width={200}
        height={130}
        style={{ objectFit: "fill" }}
      />
      <CardBody>
        <Text>{props.text}</Text>
      </CardBody>
    </Card>
  );
};

export default ResultCard;
