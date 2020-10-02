import { mount } from 'enzyme'
import React from 'react'
import { Renderer } from '@codelab/core/renderer'
import { NodeI } from '@codelab/shared/interface/node'

describe('RootRenderProps', () => {
  const data: NodeI = {
    type: 'React.Html.div',
    props: {
      parentprops: {
        __type: ['Eval'],
        value: 'return this.rootprops',
      },
    },
    children: [
      {
        type: 'React.Html.div',
        props: {
          childprops: {
            __type: ['Eval'],
            value: 'return this.rootprops',
          },
        },
        children: [
          {
            type: 'React.Html.div',
            props: {
              grandchildprops: {
                __type: ['Eval'],
                value: 'return this.rootprops',
              },
            },
          },
        ],
      },
    ],
  }

  it('can pass rootRenderProps to all level of children', () => {
    const Component = Renderer.components<{ rootprops: any }>(data)
    const wrapper = mount(<Component rootprops="rootProps" />)

    const parent = wrapper.find('div').get(0)
    const child = wrapper.find('div').get(1)
    const grandchild = wrapper.find('div').get(2)

    // Test parent component's props
    const actualParentProps = parent.props

    expect(actualParentProps).toHaveProperty('parentprops', 'rootProps')

    const actualChildProps = child.props

    expect(actualChildProps).toHaveProperty('childprops', 'rootProps')

    const actualGrandChildProps = grandchild.props

    expect(actualGrandChildProps).toHaveProperty('grandchildprops', 'rootProps')
  })
})
