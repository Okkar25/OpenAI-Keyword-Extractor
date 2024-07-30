import { Box, Container } from "@chakra-ui/react";
import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import KeywordsModal from "./components/KeywordsModal";
import TextInput from "./components/TextInput";

const App = () => {
  const [keywords, setKeywords] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const extractKeywords = async (text) => {
    setLoading(true);
    setIsOpen(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        // model: "text-davinci-003",
        model: "gpt-3.5-turbo-instruct",
        prompt:
          "Extract keywords from this text. Make the first letter of each word uppercase and separate with commas.\n\n" +
          text +
          "",
        temperature: 0.5, // control the randomness and intensity of the response
        max_tokens: 60,
        frequency_penalty: 0.8, // reduce the model's likelihood to repeat the same line verbatim.
      }),
    };

    const fetchWithRetry = async (
      url,
      options,
      retries = 5,
      backoff = 5000
    ) => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          if (response.status === 429 && retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.json();
      } catch (error) {
        throw error;
      }
    };

    try {
      const json = await fetchWithRetry(
        import.meta.env.VITE_OPENAI_API_URL,
        options
      );
      if (json.choices && json.choices.length > 0) {
        const data = json.choices[0].text.trim();
        setKeywords(data);
      } else {
        console.error("No choices found in response:", json);
        setKeywords("No keywords found.");
      }
    } catch (error) {
      console.error("Error extracting keywords:", error);
      setKeywords("Error extracting keywords.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Box bg="blue.600" color="white" height="100vh" paddingTop={100}>
      <Container maxW="3xl" centerContent>
        <Header />

        <TextInput extractKeywords={extractKeywords} />

        <Footer />
      </Container>

      <KeywordsModal
        keywords={keywords}
        loading={loading}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Box>
  );
};

export default App;
