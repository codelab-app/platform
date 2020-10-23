import { mount } from 'enzyme'
import React from 'react'
import { Renderer } from '@codelab/core/renderer'
import { NodeI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

describe('RootRenderProps', () => {
  const data: NodeI = {
    type: NodeType.React_Html_Div,
    props: {
      parentprops: {
        __type: [PropType.Eval],
        value: 'return this.rootprops',
      },
    },
    children: [
      {
        type: NodeType.React_Html_Div,
        props: {
          childprops: {
            __type: [PropType.Eval],
            value: 'return this.rootprops',
          },
        },
        children: [
          {
            type: NodeType.React_Html_Div,
            props: {
              grandchildprops: {
                __type: [PropType.Eval],
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
