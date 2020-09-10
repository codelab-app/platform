import { convertToRenderProps } from '@codelab/entity/props'
import { filterRenderProps } from './Props-renderProps'

describe('Props with renderProps type', () => {
  it('converts all props to renderProps', () => {
    const props = {
      Content: 'Content',
    }
    const renderProps = convertToRenderProps(props)

    expect(renderProps.Content.renderProps).toBeTruthy()
    expect(renderProps.Content.value).toBe('Content')
  })

  it('filters render props', () => {
    const renderProps = {
      data: {
        renderProps: true,
        value: 'data',
      },
      component: 'Codelab',
    }

    const filteredRenderProps = filterRenderProps(renderProps)

    expect(filteredRenderProps).toEqual({
      data: {
        renderProps: true,
        value: 'data',
      },
    })
  })
})
