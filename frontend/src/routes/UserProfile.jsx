import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Stack,
  Card,
  CardBody,
} from "@chakra-ui/react";

import "../styles/UserProfile.css";

export const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    setIsEditing(false);
  };

  return (
    <Box>
      <Heading mb={6}>User Profile</Heading>

      <Card className="profile-header">
        <CardBody>
          <Flex align="center">
            <Image
              boxSize="250px"
              borderRadius="full"
              src="src/assets/profile-placeholder.jpg"
              alt="Profile Picture"
            />
            <Stack spacing={2} ml={3}>
              <Heading size="md">Name</Heading>
              <Text>Role: </Text>
              <Text>Track: </Text>
              <Text>Pronouns: </Text>
            </Stack>
          </Flex>
        </CardBody>
      </Card>

      <Card className="general-info" mt={6}>
        <CardBody>
          <Flex>
            <Box flex="1" mr={10}>
              <Heading size="md" mb={4}>
                General
              </Heading>
              <Text mb={4}>
                Your basic information will be listed here. Some information is
                locked for admin permissions, if you need help please contact
                Help/Support.
              </Text>
            </Box>

            <Box flex="2">
              <SimpleGrid columns={2} spacing={6}>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    isReadOnly={!isEditing}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    isReadOnly={!isEditing}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Pronouns</FormLabel>
                  <Select
                    placeholder="Select your pronouns"
                    isDisabled={!isEditing}
                  >
                    <option value="sheher-pronouns">She/Her</option>
                    <option value="hehim-pronouns">He/Him</option>
                    <option value="theythem-pronouns">They/Them</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Track</FormLabel>
                  <Select
                    placeholder="Select your track"
                    isDisabled={!isEditing}
                  >
                    <option value="marketing">Marketing</option>
                    <option value="data-science">Data Science</option>
                    <option value="software-engineering">
                      Software Engineering
                    </option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    isReadOnly={!isEditing}
                  />
                </FormControl>
                <Box>
                  <Button
                    mt={4}
                    onClick={isEditing ? handleUpdateClick : handleEditClick}
                  >
                    {isEditing ? "Update" : "Edit Profile"}
                  </Button>
                </Box>
              </SimpleGrid>
            </Box>
          </Flex>
        </CardBody>
      </Card>

      <Card className="uploaded-videos-profile" mt={6}>
        <CardBody>
          <Heading size="md" mb={4}>
            Uploaded Videos
          </Heading>
          <Text mb={4}>
            Check to see the videos that you’ve uploaded in the past/all time to
            see how much you’ve grown! Option to manage or delete videos if
            needed.
          </Text>
          <SimpleGrid columns={3} spacing={4}>
            {/* Placeholder for video thumbnails */}
            <Box bg="gray.200" height="150px"></Box>
            <Box bg="gray.200" height="150px"></Box>
            <Box bg="gray.200" height="150px"></Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* <Card className="progress-milestones" mt={6}>
        
      </Card> */}
      <Card className="help-support" mt={6}>
        <CardBody>
          <Heading size="md" mb={4}>
            Help/Support
          </Heading>
          <Flex justify="space-between" align="start">
            <Box flex="1" mr={4}>
              <Text>
                Do you have any questions about interviewing or would like to
                let us know about what concerns you have in your upcoming
                interview(s)? Leave us a message!
              </Text>
            </Box>
            <Box flex="1">
              <form>
                <SimpleGrid columns={1} spacing={4}>
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text" placeholder="Enter your full name" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Question Type</FormLabel>
                    <Select placeholder="Select your question type">
                      <option value="interview-help">Interview Help</option>
                      <option value="concerns">Concerns</option>
                      <option value="general-question">General Question</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Your Question or Concern</FormLabel>
                    <Textarea placeholder="Enter your question or concern here" />
                  </FormControl>
                  <Button type="submit">Submit</Button>
                </SimpleGrid>
              </form>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};
