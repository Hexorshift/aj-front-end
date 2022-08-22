import Layout from '../components/Layout';
import { Center, Heading, Text } from '@chakra-ui/react';

const Custom404 = () => {
  return (
    <Layout title="404, Not Found ):" description="This page doesn't exists." keywords={[]}>
      <Center mt="20%">
        <Heading>404, Not Found (╯°□°）╯︵ ┻━┻</Heading>
      </Center>
    </Layout>
  );
};

export default Custom404;
