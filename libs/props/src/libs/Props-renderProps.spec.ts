import { convertToRenderProps } from '@codelab/props'
import { evalProps, evalPropValue } from './Props-eval'

describe('Props with renderProps type', () => {
  const props = {
    Content: 'Content',
  }

  it('converts all props to renderProps', () => {
    const renderProps = convertToRenderProps(props)

    expect(renderProps.renderProps).toBeTruthy()
    expect(renderProps.value).toBe('Content')
  })
})
