import Head from 'next/head';
import Navbar from './navbar/Navbar';
import { Container, Text } from '@chakra-ui/react';

const Layout = ({ title, description, keywords, children }) => {
  return (
    <>
      <Head>
        <title>{`Aka Japan • ${title}`}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={`${
            keywords.length !== 0 ? keywords.join(', ') : ''
          }, Aka Japan Home, AkaJapan, Aka Japan, Aka Japan Discord, Japanese, Japan, How to speak Japanese, Learning Japanese, Speaking Japanese, Japanese Discord server, Aka Japanese, 日本語, 英語, 勉強サーバー, Discord Japan, Japan Discord, 日本語サーバー, Discord Aka Japan`}
        />
        <meta property="og:site_name" content="Aka Japan" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Navbar />
      <Container maxW="1280px" height="2000px">
        {children}
      </Container>
    </>
  );
};

export default Layout;
