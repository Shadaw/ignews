import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';

import { getPrismicClient } from '../../services/prismic';

import Post, { getServerSideProps } from '../../pages/posts/[slug]';

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: '<p>Post excerpt</p>',
  updatedAt: '05 de setembro de 2021',
}

jest.mock('next-auth/client')
jest.mock('../../services/prismic')

describe('<Post />', () => {
  it('renders correctly', () => {
    render(<Post post={post} />)


    expect(screen.getByText("My new post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
  })

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        })
      })
    )
  })

  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: {},
    } as any);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My new post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post excerpt' }
          ],
        },
        last_publication_date: '09-05-2021',
      })
    } as any)

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      }
    } as any)


    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post
        }
      })
    )
  })
})
