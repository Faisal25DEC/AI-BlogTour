import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProfileLoader = () => {
  return (
    <Box width={"80%"} m="auto" mt="12.5%">
      <Flex gap="2rem">
        <Box flexBasis={"70%"}>
          <SkeletonText noOfLines={1} skeletonHeight="10" width={"40%"} />
          {Array.from({ length: 5 }, (_, index) => {
            return (
              <Box padding="6" bg="transparent">
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            );
          })}
        </Box>
        <Box>
          <SkeletonCircle width="9rem" height={"9rem"} />
          <SkeletonText noOfLines={2} width={"80%"} m="auto" mt="1rem" />
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileLoader;
