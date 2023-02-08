import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  CardHeader,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ResultsDisplay = (props: { result: string }) => {
  const DataRows = () => {
    const splitData = props.result.split(/\d+./);
    let cards = [];
    for (let i = 0; i < splitData.length; i++) {
      const element = splitData[i];
      if (element.trim().length === 0) continue;
      cards.push(
        <Card>
          <CardBody>
            <Box>
              <Heading>Testing</Heading>
              <Text>{element}</Text>
            </Box>
          </CardBody>
        </Card>
      );
    }
    return <Stack>{...cards}</Stack>;
  };

  return { ...DataRows() };
};

export default ResultsDisplay;
