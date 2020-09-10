import React from 'react'
import { ReactNodeI } from '@codelab/node'
import { mount } from 'enzyme'
import { omit } from 'lodash'
import { TreeDom } from '../renderer/TreeDom'

describe('RootRenderProps', () => {
  const data: ReactNodeI = {
    type: 'Html.div',
    nodeType: 'React',
    props: {
      parentprops: {},
    },
    children: [
      {
        type: 'Html.div',
        nodeType: 'React',
        props: {
          childprops: {},
        },
        children: [
          {
            type: 'Html.div',
            nodeType: 'React',
            props: {
              grandChildProps: {},
            },
          },
        ],
      },
    ],
  }

  it('can pass rootRenderProps to all level of children', () => {
    const Component = TreeDom.render(data)
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
