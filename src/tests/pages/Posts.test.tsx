import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { getPrismicClient } from '../../services/prismic';

import Posts, { getStaticProps } from '../../pages/posts';

const posts = [{
  slug: 'my-new-post',
  title: 'My new post',
  excerpt: 'Post excerpt',
  updatedAt: '05 de setembro de 2021',
}]

jest.mock('../../services/prismic')

describe('<Posts />', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)


    expect(screen.getByText("My new post")).toBeInTheDocument();
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My new post' }
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt' }
              ],
            },
            last_publication_date: '09-05-2021',
          }
        ]
      })
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts
        }
      })
    )
  })
})
