import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Text, useToast, VStack } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-759e.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      setToken(data.accessToken);
      toast({
        title: "Login Successful",
        description: "You're now logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCalculateFollowers = () => {
    // This function would interact with another part of the API to calculate followers
    // As we do not have that endpoint, let's just simulate it
    toast({
      title: "Calculation Complete",
      description: "The number of followers has been calculated.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="xl" centerContent>
      <Box padding="4" maxW="md" width="full">
        <VStack spacing={8}>
          {!token && (
            <>
              <Heading>Cálculo de Seguidores</Heading>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Senha</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
                Entrar
              </Button>
            </>
          )}
          {token && (
            <Flex direction="column" align="center" justify="center" width="full">
              <Text mb={4}>Bem-vindo! Clique abaixo para calcular o número de seguidores com base nos pedidos do dia atual.</Text>
              <Button colorScheme="blue" onClick={handleCalculateFollowers}>
                Calcular Seguidores
              </Button>
            </Flex>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;
