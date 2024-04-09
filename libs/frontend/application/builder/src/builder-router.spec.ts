import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { extractPathParamsFromUrlInstance } from './builder-router'

describe('extractNavigationInfoFromUrl', () => {
  const pages = [
    { builderUrlInstance: '', slug: 'about-page', urlPattern: '/about' },
    {
      builderUrlInstance: '',
      slug: 'product-detail-page',
      urlPattern: '/products/:productId',
    },
    {
      builderUrlInstance: '',
      slug: 'blog-wildcard',
      urlPattern: '/blog/:rest*',
    },
  ]

  it('should return undefined for a URL that does not match any page', () => {
    const url = '/non-existent-page'
    const result = extractPathParamsFromUrlInstance(pages, url)

    expect(result).toEqual({
      page: null,
      query: {},
    })
  })

  it('should correctly extract for a static URL', () => {
    const url = '/about'
    const result = extractPathParamsFromUrlInstance(pages, url)

    expect(result).toEqual({
      page: pages[0],
      query: {},
    })
  })

  it('should correctly extract dynamic segments from a URL', () => {
    const url = '/products/123'
    const result = extractPathParamsFromUrlInstance(pages, url)

    expect(result).toEqual({
      page: pages[1],
      query: { productId: '123' },
    })
  })

  it('should correctly handle a URL with a wildcard', () => {
    const url = '/blog/2021/updates'
    const result = extractPathParamsFromUrlInstance(pages, url)

    expect(result).toEqual({
      page: pages[2],
      query: {
        rest: ['2021', 'updates'],
      },
    })
  })

  // You might want to add more test cases to handle edge cases,
  // such as URLs with multiple dynamic segments, nested wildcards, etc.
})
