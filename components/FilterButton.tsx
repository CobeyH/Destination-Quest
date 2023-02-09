import { Box, Button, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BsEmojiLaughingFill, BsHouse, BsTreeFill } from "react-icons/bs";

type Tag = {
  text: string;
  icon: IconType;
};

const tagData: Tag[] = [
  { text: "Outdoor", icon: BsTreeFill },
  { text: "Indoor", icon: BsHouse },
  { text: "Free", icon: BsEmojiLaughingFill },
];

const FilterButtons = (props: {
  tagKeys: string[];
  setTagKeys: (keys: string[]) => void;
}) => {
  const { tagKeys, setTagKeys } = props;
  const ToggleTag = (tagText: string) => {
    if (!tagKeys.includes(tagText)) {
      setTagKeys([...tagKeys, tagText]);
    } else {
      setTagKeys(tagKeys.filter((key: string) => key !== tagText));
    }
  };
  return (
    <Box>
      {tagData.map((tag: Tag, index: number) => {
        const isActive = tagKeys.includes(tag.text);
        return (
          <Button
            m="1"
            variant="outline"
            borderRadius="20"
            leftIcon={<tag.icon />}
            onClick={() => ToggleTag(tag.text)}
            bg={isActive ? "#189AB4" : "clear"}
            border={isActive ? "1px solid transparent" : "1px solid grey"}
            _hover={{ bg: "#D4F1F4" }}
            key={index}
          >
            <Text pt="1">{tag.text}</Text>
          </Button>
        );
      })}
    </Box>
  );
};

export default FilterButtons;
