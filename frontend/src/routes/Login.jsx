import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import "../styles/Login.css";
import logo from "../assets/forge-stacked-primary.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
// import { useAdminContext } from "../components/AdminAuthentication";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [adminLogin, setAdminLogin] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("memberMe") === "true"
  );
  // const { authenticated, setAuthenticated } = useAdminContext();
  const [nextPage, setNextPage] = useState("/resumes/admin");

  const toast = useToast();

  // useEffect(() => {
  //   const query = new URLSearchParams(location.search);
  //   if (query.get("admin") === "true") {
  //     setAdminLogin(true);
  //   }
  //   if (query.get("next")) {
  //     setNextPage("/admin/" + query.get("next"));
  //   }
  //   if (adminLogin && authenticated) {
  //     navigate(nextPage);
  //   }
  // }, [authenticated, navigate, adminLogin, nextPage, location.search]);

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
    setLoading(true);

    const internalPhone = formValues.phone
      .replace(/\(/g, "")
      .replace(/\)/g, "")
      .replace(/-/g, "")
      .replace(/ /g, "")
      .replace("+1", "");

    try {
      const id = await axios.post("/functions/api/airtable/find", {
        name: formValues.name,
        phone: internalPhone,
        base: "Launch",
      });

      if (rememberMe) {
        localStorage.setItem("launchName", formValues.name);
        localStorage.setItem("launchPhone", formValues.phone);
      }

      if (id !== "") {
        navigate("/functions/api/resumes/student/" + id);
      } else {
        setInvalid(true);
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

  const toggleLoginType = () => {
    setAdminLogin(!adminLogin);
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
          <form onSubmit={handleFormSubmit}>
            {adminLogin ? (
              <>
                <FormControl className="login-form">
                  <FormLabel className="login-label">Email</FormLabel>
                  <Input
                    className="login-input"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt={4} className="login-form">
                  <FormLabel className="login-label">Password</FormLabel>
                  <Input
                    className="login-input"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                </FormControl>
              </>
            ) : (
              <>
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
              </>
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
            <Box mt={1}>
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

export default Login;
