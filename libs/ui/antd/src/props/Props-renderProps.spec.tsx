import { mount } from 'enzyme'
import React from 'react'
import { leafRenderPropsData, renderPropsData } from './Props-renderProps.data'
import { Renderer } from '@codelab/core/renderer'

describe('RenderProps', () => {
  it('can pass props from parent to child', () => {
    const Component = Renderer.components(renderPropsData)
    const wrapper = mount(<Component />)

    const child = wrapper.find('div').get(1)
    const grandchild = wrapper.find('div').get(2)

    const actualChildProps = child.props

    expect(actualChildProps).toHaveProperty('childprops', 'single')

    const actualGrandChildProps = grandchild.props

    expect(actualGrandChildProps).not.toHaveProperty(
      'grandchildprops',
      'single',
    )
  })

  it('can pass leaf props to all level of children', () => {
    const Component = Renderer.components(leafRenderPropsData)
    const wrapper = mount(<Component />)

    const child = wrapper.find('div').get(1)
    const grandchild = wrapper.find('div').get(2)

    const actualChildProps = child.props

    expect(actualChildProps).toHaveProperty('childprops', 'leaf')

    const actualGrandChildProps = grandchild.props

    expect(actualGrandChildProps).toHaveProperty('grandchildprops', 'leaf')
  })
})
