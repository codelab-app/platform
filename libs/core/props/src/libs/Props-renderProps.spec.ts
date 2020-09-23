import {
  convertToLeafRenderProps,
  leafRenderPropsFilter,
  renderPropsFilter,
  singleRenderPropsFilter,
} from './Props-renderProps'

describe('Props with renderProps type', () => {
  const props = {
    content: 'Content',
    visibility: {
      __type: 'eval',
      value: 'return true',
    },
  }

  const renderProps = {
    data: {
      __type: 'single',
      value: 'data',
    },
    visibility: {
      __type: ['single', 'eval'],
      value: 'return true',
    },
    onClick: {
      __type: 'leaf',
      value: 'return',
    },
    onChange: {
      __type: ['leaf', 'eval'],
      value: 'return',
    },
    component: 'Codelab',
  }

  it('converts all props to leafRenderProps', () => {
    const leafRenderProps = convertToLeafRenderProps(props)

    expect(leafRenderProps.content).toEqual({
      __type: 'leaf',
      value: 'Content',
    })
    expect(leafRenderProps.visibility).toEqual({
      __type: ['eval', 'leaf'],
      value: 'return true',
    })
  })

  it('filters render props', () => {
    const filteredRenderProps = renderPropsFilter(renderProps)

    expect(filteredRenderProps).toEqual({
      data: {
        __type: 'single',
        value: 'data',
      },
      visibility: {
        __type: ['single', 'eval'],
        value: 'return true',
      },
      onClick: {
        __type: 'leaf',
        value: 'return',
      },
      onChange: {
        __type: ['leaf', 'eval'],
        value: 'return',
      },
    })
  })

  it('filters single render props', () => {
    const singleRenderProps = singleRenderPropsFilter(renderProps)

    expect(singleRenderProps).toEqual({
      data: {
        __type: 'single',
        value: 'data',
      },
      visibility: {
        __type: ['single', 'eval'],
        value: 'return true',
      },
    })
  })

  it('filters leaf render props', () => {
    const leafRenderProps = leafRenderPropsFilter(renderProps)

    expect(leafRenderProps).toEqual({
      onClick: {
        __type: 'leaf',
        value: 'return',
      },
      onChange: {
        __type: ['leaf', 'eval'],
        value: 'return',
      },
    })
  })
})
