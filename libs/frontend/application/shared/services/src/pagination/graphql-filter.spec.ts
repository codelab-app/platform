import { graphqlFilterMatches } from './graphql-filter'

describe('graphqlFilter', () => {
  it('should return an empty object for empty filter array', () => {
    const result = graphqlFilterMatches([], 'test')

    expect(result).toEqual({})
  })

  it('should create correct filter object for single field', () => {
    const result = graphqlFilterMatches(['name'], 'John')

    expect(result).toEqual({ name_MATCHES: '(?i).*John.*' })
  })

  it('should create correct filter object for multiple fields', () => {
    const result = graphqlFilterMatches(['name', 'email', 'phone'], 'search')

    expect(result).toEqual({
      email_MATCHES: '(?i).*search.*',
      name_MATCHES: '(?i).*search.*',
      phone_MATCHES: '(?i).*search.*',
    })
  })

  it('should handle special characters in search string', () => {
    const result = graphqlFilterMatches(['field'], 'test')

    expect(result).toEqual({ field_MATCHES: '(?i).*test.*' })
  })

  it('should handle empty search string', () => {
    const result = graphqlFilterMatches(['field1', 'field2'], '')

    expect(result).toEqual({
      field1_MATCHES: '.*',
      field2_MATCHES: '.*',
    })
  })
})
