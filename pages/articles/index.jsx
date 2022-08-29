import Layout from '../../components/Layout';
import fs from 'fs';
import matter from 'gray-matter';
import NextLink from 'next/link';
import readdirp from 'readdirp';
import { Box, Flex, Heading, Link, Text, Tag, filter, Input, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

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
      tags: ['culture', 'grammar', 'n5', 'n4', 'n3', 'n2', 'n1'],
      articles
    }
  };
}

const Articles = ({ tags, articles }) => {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [filteredTags, setFilteredTags] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (filteredTags.length === 0) {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter((article) => article.meta.tags.some((tag) => filteredTags.includes(tag))));
    }

    setFilteredArticles((filteredArticles) =>
      filteredArticles.filter((article) => article.meta.title.toLowerCase().startsWith(search))
    );
  }, [filteredTags, search]);

  const renderFilteredArticles = () => {
    if (filteredArticles.length !== 0) {
      return filteredArticles.map((article) => {
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
      });
    } else {
      return (
        <Center>
          <Text fontSize="2xl">No Articles found ):</Text>
        </Center>
      );
    }
  };

  return (
    <Layout title="Articles" description="Articles about Japan and the Japanese language." keywords={[]}>
      <Box mt="5">
        <Input
          variant="flushed"
          placeholder="Search for an article"
          fontSize="2xl"
          mb="3"
          focusBorderColor="red"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <Heading as="h5" fontSize="2xl" fontWeight="normal">
          Tags:
        </Heading>
        <Flex mb="3" wrap="wrap">
          {tags.map((tag, index) => {
            return (
              <Tag
                key={index}
                mr="2"
                my="1"
                cursor="pointer"
                colorScheme={filteredTags.includes(tag) ? 'green' : 'red'}
                onClick={() => {
                  if (filteredTags.includes(tag)) {
                    setFilteredTags((filteredTags) => filteredTags.filter((filteredTag) => filteredTag !== tag));
                  } else {
                    setFilteredTags((filteredTags) => [...filteredTags, tag]);
                  }
                }}
              >
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </Flex>
        {renderFilteredArticles()}
      </Box>
    </Layout>
  );
};

export default Articles;
