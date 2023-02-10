import { Card, CardBody, Text } from "@chakra-ui/react";
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
      const match = /[A-Z]+[a-z]*/g;
      let queryString = props.text.match(match);
      if (!queryString || queryString.length === 0) return;
      const matchedWords = queryString.filter(
        (word) => !bannedWords.includes(word)
      );
      const res = await photoSearch(
        matchedWords.join(" ") + "" + props.location
      );

      //@ts-ignore
      setImage(res.response?.results[0].urls.small);
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
