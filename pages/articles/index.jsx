import Layout from '../../components/Layout';
import fs from 'fs';
import matter from 'gray-matter';
import NextLink from 'next/link';
import readdirp from 'readdirp';
import { Box, Flex, Heading, Link, Text, Tag } from '@chakra-ui/react';

export async function getStaticProps(context) {
  const articleFiles = await readdirp.promise(`articles`, {
    fileFilter: '*.mdx'
  });
  const articles = articleFiles.map((file) => {
    const markdownWithMeta = fs.readFileSync(file.fullPath, 'utf-8');
    const { data: meta } = matter(markdownWithMeta);

    return {
      meta,
      slug: file.basename.split('.')[0]
    };
  });

  return {
    props: {
      articles
    }
  };
}

const Articles = ({ articles }) => {
  return (
    <Layout title="Articles" description="Articles about Japan and the Japanese language." keywords={[]}>
      <Box mt="5">
        {articles.map((article) => {
          return (
            <NextLink key={article.slug} href={`/articles/${article.slug}`} passHref>
              <Link _hover={{}}>
                <Flex
                  className="leading-member-card"
                  flexDir="row"
                  justifyContent="space-between"
                  borderRadius="md"
                  p="3"
                  mb="2"
                >
                  <Flex flexDir="column">
                    <Heading as="h2" fontSize="2xl" fontWeight="normal">
                      {article.meta.title}
                    </Heading>
                    <Text>{article.meta.description}</Text>
                  </Flex>
                </Flex>
              </Link>
            </NextLink>
          );
        })}
      </Box>
    </Layout>
  );
};

export default Articles;
