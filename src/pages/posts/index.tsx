import Head from 'next/head';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom'

import { getPrismicClient } from '../../services/prismic';

import { Container, PostsWrapper } from './styles';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

type PostsProps = {
  posts: Post[]
};

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <Container>
        <PostsWrapper>
          {posts.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </PostsWrapper>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 100,
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }
  })

  return {
    props: {
      posts,
    }
  }
}