import {
  convertToLeafRenderProps,
  filterRenderProps,
} from './Props-renderProps'
import { convertToRenderProps } from '@codelab/core/props'

describe('Props with renderProps type', () => {
  it('converts all props to renderProps', () => {
    const props = {
      Content: 'Content',
    }
    const renderProps = convertToRenderProps(props)

    expect(renderProps.Content.renderProps).toBeTruthy()
    expect(renderProps.Content.value).toBe('Content')
  })

  it('converts all props to leafRenderProps', () => {
    const props = {
      Content: 'Content',
    }
    const renderProps = convertToLeafRenderProps(props)

    expect(renderProps.Content.renderProps).toBe('leaf')
    expect(renderProps.Content.value).toBe('Content')
  })

  it('filters render props', () => {
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

    const filteredRenderProps = filterRenderProps(renderProps)

    expect(filteredRenderProps).toEqual({
      data: {
        renderProps: true,
        value: 'data',
      },
      event: {
        renderProps: 'leaf',
        value: 'event',
      },
    })
  })

  it('filters single render props', () => {
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

  it('filters leaf render props', () => {
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
