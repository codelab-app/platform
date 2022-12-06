import { increaseCssPrecedence } from '../utils/increaseCssPrecedence'

describe('increaseCssPrecedence', () => {
  const testCss = {
    display: 'flex',
    padding: 0,
  }

  it('should increase precedence for each prop when parameter is css string', async () => {
    const result = increaseCssPrecedence(JSON.stringify(testCss))

    expect(result).toEqual({
      display: 'flex !important;',
      padding: '0 !important;',
    })
  })

  it('should increase precedence for each prop when parameter is css object', async () => {
    const result = increaseCssPrecedence(testCss)

    expect(result).toEqual({
      display: 'flex !important;',
      padding: '0 !important;',
    })
  })
})
