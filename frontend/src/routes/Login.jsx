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
  const [adminLogin, setAdminLogin] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const toggleLoginType = () => {
    setAdminLogin(!adminLogin);
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    // localStorage.setItem("memberMe", isChecked.toString());
  };

  return (
    <div className="login-page">
      <Box className="login-container" p={8} boxShadow="md" bg="gray.50">
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
                <FormControl className="login-form">
                  <FormLabel className="login-label">Email</FormLabel>
                  <Input
                    className="login-input"
                    type="email"
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormControl mt={4} className="login-form">
                  <FormLabel className="login-label">Password</FormLabel>
                  <Input
                    className="login-input"
                    type="password"
                    placeholder="Enter your password"
                  />
                </FormControl>
              </>
            ) : (
              <>
                <FormControl className="login-form">
                  <FormLabel className="login-label">Full Name</FormLabel>
                  <Input
                    className="login-input"
                    type="name"
                    placeholder="Enter your full name"
                  />
                </FormControl>
                <FormControl mt={4} className="login-form">
                  <FormLabel className="login-label">Phone Number</FormLabel>
                  <Input
                    className="login-input"
                    type="telephone"
                    placeholder="Enter your phone number"
                  />
                </FormControl>
              </>
            )}
            <Stack mt={4}>
              <Checkbox
                className="remember-me"
                colorScheme="red"
                isChecked={rememberMe}
                onChange={handleRememberMeChange}
              >
                Remember Me
              </Checkbox>

              <Button mt={4} type="submit" className="sign-in-button">
                LOGIN
              </Button>
            </Stack>
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
    </div>
  );
};
