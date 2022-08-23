import Layout from '../components/Layout';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';
import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { comma } from 'number-magic';

export async function getStaticProps(context) {
  const API_ENDPOINT = process.env.API_ENDPOINT;
  const response = await fetch(`${API_ENDPOINT}/api/leaderboard?page=1&type=balance`);
  const data = await response.json();

  return {
    props: {
      API_ENDPOINT,
      initialData: data.users
    },
    revalidate: 10
  };
}

const Leaderboard = ({ API_ENDPOINT, initialData }) => {
  const [users, setUsers] = useState([...initialData]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const loadFunc = async () => {
    const response = await fetch(`${API_ENDPOINT}/api/leaderboard?page=${page}&type=balance`);
    const data = await response.json();

    data.totalPages === page ? setHasMore(false) : setHasMore(true);
    setUsers((users) => [...users, ...data.users]);
    setPage((page) => page + 1);
  };

  return (
    <Layout
      title="Leaderboard"
      description="Aka Japan's leaderboard."
      keywords={['Aka Japan Leaderboard, Aka Japan Yen']}
    >
      <Box mt="5">
        <InfiniteScroll
          dataLength={users.length}
          next={loadFunc}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<h4>No more users to display.</h4>}
        >
          {users.map((user) => (
            <Flex
              key={user._id}
              className="leading-member-card"
              flexDir="row"
              justifyContent="space-between"
              alignItems="center"
              borderRadius="md"
              p="3"
              mb="2"
              width="100%"
            >
              <Flex alignItems="center" justifyContent="space-between" width="100%">
                <Flex flexDir="row" alignItems="center">
                  <Image src={user.avatar} width={48} height={48} style={{ borderRadius: '100%' }} quality={100} />
                  <Flex flexDir="column" ml="2">
                    <Text fontWeight="semibold">{user.username}</Text>
                    <Text>{comma(user.balance)}円</Text>
                  </Flex>
                </Flex>
                <Text fontWeight="semibold">#{user.rank}</Text>
              </Flex>
            </Flex>
          ))}
        </InfiniteScroll>
      </Box>
    </Layout>
  );
};

export default Leaderboard;
