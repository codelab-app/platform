import { mount } from 'enzyme'
import React from 'react'
import { leafRenderPropsData, renderPropsData } from './Props-renderProps.data'
import { Renderer } from '@codelab/alpha/core/renderer'
import { PropType } from '@codelab/alpha/shared/interface/props'

describe('RenderProps', () => {
  it('can pass props from parent to child', () => {
    const Component = Renderer.components(renderPropsData)
    const wrapper = mount(<Component />)

    const child = wrapper.find('div').get(1)
    const grandchild = wrapper.find('div').get(2)

    const actualChildProps = child.props

    expect(actualChildProps).toHaveProperty('childprops', PropType.Single)

    const actualGrandChildProps = grandchild.props

    expect(actualGrandChildProps).not.toHaveProperty(
      'grandchildprops',
      PropType.Single,
    )
  })

  it('can pass leaf props to all level of children', () => {
    const Component = Renderer.components(leafRenderPropsData)
    const wrapper = mount(<Component />)

    const child = wrapper.find('div').get(1)
    const grandchild = wrapper.find('div').get(2)

    const actualChildProps = child.props

    expect(actualChildProps).toHaveProperty('childprops', PropType.Leaf)

    const actualGrandChildProps = grandchild.props

    expect(actualGrandChildProps).toHaveProperty(
      'grandchildprops',
      PropType.Leaf,
    )
  })

  it('can pass props outside and override internal props if prop name is the same', () => {
    const Component = Renderer.components<{
      singleprops: string
      newprop: string
    }>(renderPropsData)
    const wrapper = mount(
      <Component singleprops="external_prop" newprop="new_ext_prop" />,
    )

    const rootCmt = wrapper.find('div').get(0)
    const child = wrapper.find('div').get(1)
    const grandchild = wrapper.find('div').get(2)

    const actualRootProps = rootCmt.props

    expect(actualRootProps).toHaveProperty('singleprops', 'external_prop')
    expect(actualRootProps).toHaveProperty('newprop', 'new_ext_prop')

    const actualChildProps = child.props

    expect(actualChildProps).toHaveProperty('childprops', 'external_prop')

    const actualGrandChildProps = grandchild.props

    expect(actualGrandChildProps).toHaveProperty(
      'grandchildprops',
      'external_prop',
    )
  })
})
