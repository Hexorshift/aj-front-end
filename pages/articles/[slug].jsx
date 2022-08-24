import fs from 'fs';
import matter from 'gray-matter';
import readdirp from 'readdirp';
import Layout from '../../components/Layout';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { Container, Heading } from '@chakra-ui/react';

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
  return (
    <Layout title={meta.title} description="" keywords={[]}>
      <Container maxW="100%" p="0" mt="10%">
        <Heading mb="2" fontWeight="normal" fontSize="5xl">
          {meta.title}
        </Heading>
        <div className="mdx-prose">
          <MDXRemote {...mdxSource} />
        </div>
      </Container>
    </Layout>
  );
};

export default Article;
