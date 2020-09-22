import { mount } from 'enzyme'
import { omit } from 'lodash'
import React from 'react'
import { Renderer } from '@codelab/core/renderer'
import { NodeDtoI } from '@codelab/shared/interface/node'

describe('RootRenderProps', () => {
  const data: NodeDtoI = {
    type: 'React.Html.div',
    props: {
      parentprops: {},
    },
    children: [
      {
        type: 'React.Html.div',
        props: {
          childprops: {},
        },
        children: [
          {
            type: 'React.Html.div',
            props: {
              grandChildProps: {},
            },
          },
        ],
      },
    ],
  }

  it('can pass rootRenderProps to all level of children', () => {
    const Component = Renderer.components(data)
    const wrapper = mount(<Component rootProps="rootProps" />)

    const parent = wrapper.find('div').get(0)
    const child = wrapper.find('div').get(1)
    const grandchild = wrapper.find('div').get(2)

    // Test parent component's props
    const actualParentProps = omit(parent.props, 'children')

    expect(actualParentProps).toEqual({
      parentprops: {},
      rootProps: { renderProps: 'leaf', value: 'rootProps' },
    })

    const actualChildProps = omit(child.props, 'children')

    expect(actualChildProps).toEqual({
      rootProps: { renderProps: 'leaf', value: 'rootProps' },
      childprops: {},
    })

    const actualGrandChildProps = omit(grandchild.props, 'children')

    expect(actualGrandChildProps).toEqual({
      rootProps: { renderProps: 'leaf', value: 'rootProps' },
      grandChildProps: {},
    })
  })
})
