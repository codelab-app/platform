import React from 'react'
import { filterRenderProps } from '@codelab/props'
import { Props } from '@codelab/shared/interface'
import { mount } from 'enzyme'
import { omit } from 'lodash'
import { TreeDom } from '../renderer/TreeDom'
import { renderPropsData, leafRenderPropsData } from './Props-renderProps.data'

describe('RenderProps', () => {
  it('filters props for renderProps', () => {
    const props: Props = {
      onHover: {
        someAction: '',
      },
      onClick: {
        renderProps: true,
        someAction: '',
      },
    }
    const expectedProps: Props = {
      onClick: {
        renderProps: true,
        someAction: '',
      },
    }

    const renderProps = filterRenderProps(props)

    expect(renderProps).toStrictEqual(expectedProps)
  })

  it('can pass props from parent to child', () => {
    const Component = TreeDom.render(renderPropsData)
    const wrapper = mount(<Component />)

    const parent = wrapper.find('div').get(0)
    const child = wrapper.find('div').get(1)

    // Test parent component's props
    const actualParentProps = omit(parent.props, 'children')

    expect(actualParentProps).toEqual({
      visibility: '',
      parentprops: {
        renderProps: true,
        value: {},
      },
    })

    const actualChildProps = omit(child.props, 'children')

    expect(actualChildProps).toEqual({
      parentprops: {
        renderProps: true,
        value: {},
      },
      childprops: {},
    })
  })

  it('can pass leaf props to all level of children', () => {
    const Component = TreeDom.render(leafRenderPropsData)
    const wrapper = mount(<Component />)

    const parent = wrapper.find('div').get(0)
    const child = wrapper.find('div').get(1)
    const grandchild = wrapper.find('div').get(2)

    // Test parent component's props
    const actualParentProps = omit(parent.props, 'children')

    expect(actualParentProps).toEqual({
      visibility: '',
      leafprops: {
        renderProps: { leaf: true },
        value: {},
      },
    })

    const actualChildProps = omit(child.props, 'children')

    expect(actualChildProps).toEqual({
      leafprops: {
        renderProps: { leaf: true },
        value: {},
      },
      childprops: {},
    })

    const actualGrandChildProps = omit(grandchild.props, 'children')

    expect(actualGrandChildProps).toEqual({
      leafprops: {
        renderProps: { leaf: true },
        value: {},
      },
      grandChildProps: {},
    })
  })
})
