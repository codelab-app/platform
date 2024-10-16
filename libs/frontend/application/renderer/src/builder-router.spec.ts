import { extractPathParamsFromUrl } from './hooks/useOverrideAtomProps.hook'

describe('extractNavigationInfoFromUrl', () => {
  const pages = [
    { id: 'about-page', urlPattern: '/about' },
    { id: 'product-detail-page', urlPattern: '/products/:productId' },
    { id: 'blog-wildcard', urlPattern: '/blog/:rest*' },
  ]

  it('should return undefined for a URL that does not match any page', () => {
    const url = '/non-existent-page'
    const result = extractPathParamsFromUrl(pages, url)

    expect(result).toEqual({
      pageId: null,
      query: {},
    })
  })

  it('should correctly extract for a static URL', () => {
    const url = '/about'
    const result = extractPathParamsFromUrl(pages, url)

    expect(result).toEqual({
      pageId: pages[0]!.id,
      query: {},
    })
  })

  it('should correctly extract dynamic segments from a URL', () => {
    const url = '/products/123'
    const result = extractPathParamsFromUrl(pages, url)

    expect(result).toEqual({
      pageId: pages[1]!.id,
      query: { productId: '123' },
    })
  })

  it('should correctly handle a URL with a wildcard', () => {
    const url = '/blog/2021/updates'
    const result = extractPathParamsFromUrl(pages, url)

    expect(result).toEqual({
      pageId: pages[2]!.id,
      query: {
        rest: ['2021', 'updates'],
      },
    })
  })

  // You might want to add more test cases to handle edge cases,
  // such as URLs with multiple dynamic segments, nested wildcards, etc.
})
