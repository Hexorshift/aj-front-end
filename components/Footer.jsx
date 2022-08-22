import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box mt="8">
      <Text>Aka Japan, {new Date().getFullYear()}</Text>
      <Text>Made by Zyleaf</Text>
    </Box>
  );
};

export default Footer;
