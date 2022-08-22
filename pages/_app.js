import '../styles/globals.css';
import theme from '../styles/theme';
import { ChakraProvider, Text } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import Marquee from 'react-fast-marquee';

function MyApp({ Component, session, pageProps }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Marquee direction="left" pauseOnHover={true} gradient={false}>
          <Text fontWeight="semibold">Aka Japanへようこそ！</Text>
        </Marquee>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
