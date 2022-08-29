import fs from 'fs';
import matter from 'gray-matter';
import readdirp from 'readdirp';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoMdArrowBack } from 'react-icons/io';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { Heading, Container, Text, Flex, Box, IconButton } from '@chakra-ui/react';

export const getStaticPaths = async () => {
  const articleFiles = await readdirp.promise('articles', { fileFilter: '*.mdx' });
  const paths = articleFiles.map((file) => {
    return {
      params: {
        slug: file.basename.replace('.mdx', '')
      }
    };
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async (context) => {
  const articleFiles = await readdirp.promise('articles', { fileFilter: '*.mdx' });
  const articleFile = articleFiles.find((file) => file.basename === `${context.params.slug}.mdx`);
  const markdownWithMeta = fs.readFileSync(articleFile.fullPath, 'utf-8');
  const { data: meta, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      meta,
      slug: context.params.slug,
      mdxSource
    }
  };
};

const Article = ({ meta, slug, mdxSource }) => {
  const router = useRouter();

  return (
    <Layout title={meta.title} description={meta.description} keywords={[]}>
      <Box maxW="900px" mt="5" mx="auto">
        <Flex flexDir="row" alignItems="center" mb="2">
          <IconButton icon={<IoMdArrowBack />} fontSize="2xl" mr="2" onClick={() => router.back()} />
          <Heading as="h2" fontSize={['3xl', '4xl', '5xl', '6xl']} fontWeight="normal">
            {meta.title}
          </Heading>
        </Flex>
        <Flex alignItems="center">
          <Image
            src="https://cdn.discordapp.com/avatars/526449871671001098/38faf9795ed492ab4355857cd5336660.png?size=128"
            width={36}
            height={36}
            style={{ borderRadius: '100%', border: '2px solid gray' }}
            quality={100}
          />
          <Text ml="2">
            {meta.author} • {meta.date}
          </Text>
        </Flex>
        <Box className="mdx-prose" mt="3">
          <MDXRemote {...mdxSource} />
        </Box>
        <Box>
          <Heading>Reccomended Articles</Heading>
        </Box>
      </Box>
    </Layout>
  );
};

export default Article;
