import Layout from '../components/Layout';
import Image from 'next/image';
import { Box, Button, Flex, Heading, Text, chakra, useColorMode, Link } from '@chakra-ui/react';

export async function getStaticProps(context) {
  const response = await fetch(`${process.env.API_ENDPOINT}/api/top`);
  const data = await response.json();

  return {
    props: {
      topUsers: data.users
    },
    revalidate: 10
  };
}

const Home = ({ topUsers }) => {
  const { colorMode } = useColorMode();

  return (
    <Layout
      title="Home"
      description="Aka Japan is a Discord community dedicated to helping learners of all levels to learn, share, and discover the Japanese language. We have native and experienced Japanese/English speakers that are willing to guide you down the road to fluency. Start your learning adventure by joining us today!"
      keywords={['Home', 'lmao']}
    >
      <Box mt="20%">
        <Heading as="h2" fontSize={['5xl', '5xl', '7xl', '7xl', '7xl']} textAlign="center">
          IMAGINE A PLACE...
        </Heading>
        <Text mt="2" fontSize="2xl" fontWeight="normal" textAlign="center">
          ...where you can meet others who are also studying Japanese. A community of learners helping each other to
          learn, share, and discover the Japanese language. A place that makes it easy to talk every day and practice
          more often.
        </Text>
        <Flex mt="2" justifyContent="center" wrap="wrap">
          <Button
            fontWeight="normal"
            width="240px"
            borderRadius="full"
            mb={['2', '2', '0', '0']}
            mr={['0', '0', '4', '4']}
          >
            <Link href="https://discord.com/invite/nihon" target="_blank" _hover={{}} width="100%">
              Join Server
            </Link>
          </Button>
          <Button fontWeight="normal" width="240px" borderRadius="full">
            <Link
              href="https://disboard.org/server/reviews/693870033431953408"
              target="_blank"
              _hover={{}}
              width="100%"
            >
              See Reviews on Disboard
            </Link>
          </Button>
        </Flex>
      </Box>
      <Flex mt="20" justifyContent="space-between" wrap="wrap" width="100%">
        <Flex flexDir="column" width={['100%', '100%', '45%', '45%']}>
          <Heading as="h4" fontWeight="semibold" mb="2">
            Our Leading Members
          </Heading>
          {topUsers.map((user, index) => {
            return (
              <Flex
                key={index}
                className="leading-member-card"
                flexDir="row"
                justifyContent="space-between"
                alignItems="center"
                borderRadius="md"
                p="3"
                mb="2"
              >
                <Flex alignItems="center">
                  <Text fontWeight="semibold" mr="2">
                    {index + 1}.
                  </Text>
                  <Flex flexDir="row" alignItems="center">
                    <Image src={user.avatar} width={48} height={48} style={{ borderRadius: '100%' }} quality={100} />
                    <Flex flexDir="column" ml="2">
                      <Text fontWeight="semibold" fontSize={['xs', 'xs', 'md', 'md']}>
                        {user.username}
                      </Text>
                      <Text>{user.thankCount} thanks</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
        <Flex flexDir="column" width={['100%', '100%', '40%', '40%']}>
          <Heading as="h4" fontWeight="semibold" mb="2">
            Server Overview
          </Heading>
          <chakra.iframe
            borderRadius="md"
            src={`https://discord.com/widget?id=693870033431953408&theme=${colorMode}`}
            width={['100%', '100%', '100%', '100%']}
            height="500px"
            allowtransparency="true"
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></chakra.iframe>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Home;
