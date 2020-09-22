import { mount } from 'enzyme'
import { omit } from 'lodash'
import React from 'react'
import { leafRenderPropsData, renderPropsData } from './Props-renderProps.data'
import { filterRenderProps } from '@codelab/core/props'
import { Renderer } from '@codelab/core/renderer'
import { Props } from '@codelab/shared/interface/props'

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
    const Component = Renderer.components(renderPropsData)
    const wrapper = mount(<Component />)

    const parent = wrapper.find('div').get(0)
    const child = wrapper.find('div').get(1)
    const grandchild = wrapper.find('div').get(2)

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

    const actualGrandChildProps = omit(grandchild.props, 'children')

    expect(actualGrandChildProps).toEqual({
      grandchildprops: {},
    })
  })

  it('can pass leaf props to all level of children', () => {
    const Component = Renderer.components(leafRenderPropsData)
    const wrapper = mount(<Component />)

    const parent = wrapper.find('div').get(0)
    const child = wrapper.find('div').get(1)
    const grandchild = wrapper.find('div').get(2)

    // Test parent component's props
    const actualParentProps = omit(parent.props, 'children')

    expect(actualParentProps).toEqual({
      visibility: '',
      leafprops: {
        renderProps: 'leaf',
        value: {},
      },
    })

    const actualChildProps = omit(child.props, 'children')

    expect(actualChildProps).toEqual({
      leafprops: {
        renderProps: 'leaf',
        value: {},
      },
      childprops: {},
    })

    const actualGrandChildProps = omit(grandchild.props, 'children')

    expect(actualGrandChildProps).toEqual({
      leafprops: {
        renderProps: 'leaf',
        value: {},
      },
      grandChildProps: {},
    })
  })
})
