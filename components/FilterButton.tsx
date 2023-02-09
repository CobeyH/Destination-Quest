import { Box, Button, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BsEmojiLaughingFill, BsHouse, BsTreeFill } from "react-icons/bs";

type Tag = {
  text: string;
  icon: IconType;
  mutuallyExclusive?: string[];
};

const tagData: Tag[] = [
  { text: "Outdoor", icon: BsTreeFill, mutuallyExclusive: ["Indoor"] },
  { text: "Indoor", icon: BsHouse, mutuallyExclusive: ["Outdoor"] },
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

  // Check if a currently active tag is conflicting with another tag.
  const IsConflictingTag = (tagKey: string): boolean => {
    const tagFromKey = tagData.find((tag: Tag) => tag.text === tagKey);
    if (!tagFromKey || !tagFromKey.mutuallyExclusive) return false;
    return tagFromKey.mutuallyExclusive.some((conflictKey: string) =>
      tagKeys.includes(conflictKey)
    );
  };

  return (
    <Box>
      {tagData.map((tag: Tag, index: number) => {
        const isActive = tagKeys.includes(tag.text);
        return (
          <Button
            size="sm"
            m="1"
            variant="outline"
            borderRadius="20"
            leftIcon={<tag.icon />}
            onClick={() => ToggleTag(tag.text)}
            bg={isActive ? "#189AB4" : "clear"}
            isDisabled={IsConflictingTag(tag.text)}
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
