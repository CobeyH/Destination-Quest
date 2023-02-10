import { Stack } from "@chakra-ui/react";
import ResultCard from "./ResultCard";

const ResultsDisplay = (props: { result: string; location: string }) => {
  const DataRows = () => {
    const splitData = props.result.split(/\d+[.]/);
    let cards = [];
    for (let i = 0; i < splitData.length; i++) {
      const element = splitData[i];
      if (element.trim().length === 0) continue;
      cards.push(
        <ResultCard text={element} key={i} location={props.location} />
      );
    }
    return <Stack>{...cards}</Stack>;
  };

  return { ...DataRows() };
};

export default ResultsDisplay;
