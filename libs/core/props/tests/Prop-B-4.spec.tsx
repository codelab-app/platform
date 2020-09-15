import { filterRenderProps } from '@codelab/core/props'

describe('User can pass props to children [PROP-B-4]', () => {
  it('should know how to filter RenderProps propType', () => {
    const renderProps = {
      data: {
        renderProps: true,
        value: 'data',
      },
      event: {
        renderProps: 'leaf',
        value: 'event',
      },
      component: 'Codelab',
    }

    const filteredRenderProps = filterRenderProps(renderProps, 'single')

    expect(filteredRenderProps).toEqual({
      data: {
        renderProps: true,
        value: 'data',
      },
    })
  })

  it('should know how to filter LeafRenderProps propType', () => {
    const renderProps = {
      data: {
        renderProps: true,
        value: 'data',
      },
      event: {
        renderProps: 'leaf',
        value: 'event',
      },
      component: 'Codelab',
    }

    const filteredRenderProps = filterRenderProps(renderProps, 'leaf')

    expect(filteredRenderProps).toEqual({
      event: {
        renderProps: 'leaf',
        value: 'event',
      },
    })
  })
})
