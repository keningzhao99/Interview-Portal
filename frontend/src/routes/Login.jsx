import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  VStack,
  Image,
  FormHelperText,
  Checkbox,
} from "@chakra-ui/react";
import "../styles/Login.css";
import logo from "../assets/forge-stacked-primary.png";

export const Login = () => {
  // States for switching between student and admin login
  const [adminLogin, setAdminLogin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const toggleLoginType = () => {
    setAdminLogin(!adminLogin);
  };

  return (
    <Box className="login-container">
      <Stack spacing="4">
        <VStack as="header" spacing="6" mt="8">
          <Image src={logo} alt="Forge Logo" className="logo" />
          <Heading as="h1" className="heading">
            {adminLogin ? "Admin Login" : "Student Login"}
          </Heading>
        </VStack>
        <form onSubmit={handleSubmit}>
          {adminLogin ? (
            <>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter your email" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Enter your password" />
              </FormControl>
            </>
          ) : (
            <>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" placeholder="Enter your full name" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input type="tel" placeholder="Enter your phone number" />
              </FormControl>
            </>
          )}
          <Stack mt={4}>
            <Checkbox colorScheme="red" defaultChecked>
              Remember Me
            </Checkbox>
          </Stack>
          <Button mt={4} type="submit" className="sign-in-button">
            LOGIN
          </Button>
          <Box mt={4}>
            <Link href="#" className="toggle-link" onClick={toggleLoginType}>
              {adminLogin ? "Student Login" : "Admin Login"}
            </Link>
          </Box>
        </form>
      </Stack>
      <Center as="footer" mt={8}>
        <FormControl>
          <FormHelperText className="footer-text form-helper-text">
            Copyright ©{" "}
            <Link href="https://joinforge.co/" color="inherit" isExternal>
              Forge
            </Link>{" "}
            2024.
          </FormHelperText>
        </FormControl>
      </Center>
    </Box>
  );
};
