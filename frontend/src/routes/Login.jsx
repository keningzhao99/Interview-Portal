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
  useToast,
  Text,
} from "@chakra-ui/react";
import "../styles/Login.css";
import logo from "../assets/forge-stacked-primary.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
  });
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("memberMe") === "true"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    localStorage.setItem("memberMe", isChecked.toString());
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setInvalid(false);
    setLoading(true);

    // Input validation: if one or more form values are left empty
    if (!formValues.name || !formValues.phone) {
      setErrorMessage("Please enter your credentials.");
      setLoading(false);
      return;
    }

    const internalPhone = formValues.phone.replace(/\D/g, ""); // Clean phone number so that it is just a string of numbers

    // Calling our routing
    try {
      const response = await axios.post("http://localhost:5001/api/find", {
        name: formValues.name,
        phone: internalPhone,
      });

      if (response.data.success) {
        if (rememberMe) {
          localStorage.setItem("launchName", formValues.name);
          localStorage.setItem("launchPhone", formValues.phone);
        }

        // Navigate to the user's home page once user input information matches to database
        navigate("/home");
      } else {
        setInvalid(true);
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Box className="login-container" p={8} boxShadow="md" bg="gray.50">
        <Stack spacing="4">
          <VStack as="header" spacing="6" mt="8">
            <Image src={logo} alt="Forge Logo" className="logo" />
            <Heading as="h1" className="heading">
              Student Login
            </Heading>
          </VStack>
          <form onSubmit={handleFormSubmit}>
            <FormControl className="login-form">
              <FormLabel className="login-label">Full Name</FormLabel>
              <Input
                className="login-input"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formValues.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4} className="login-form">
              <FormLabel className="login-label">Phone Number</FormLabel>
              <Input
                className="login-input"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formValues.phone}
                onChange={handleChange}
              />
            </FormControl>
            {errorMessage && (
              <Text color="red.500" mt={2}>
                {errorMessage}
              </Text>
            )}
            <Stack mt={4}>
              <Checkbox
                className="remember-me"
                colorScheme="purple"
                isChecked={rememberMe}
                onChange={handleRememberMeChange}
              >
                Remember Me
              </Checkbox>

              <Button
                mt={4}
                type="submit"
                colorScheme="purple"
                className="sign-in-button"
                isLoading={loading}
              >
                LOGIN
              </Button>
            </Stack>
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

export default Login;
