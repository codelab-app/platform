import { mount } from 'enzyme'
import React from 'react'
import { propsFilter, withFilters } from './Props-filter'

describe('Props filter', () => {
  const props = { a: 1, b: 0, c: 2 }
  const allowedKeys = ['a', 'c']
  const filterCb = propsFilter(allowedKeys)

  it('filters props by key', () => {
    expect(filterCb(props)).toMatchObject({ a: 1, c: 2 })
  })

  it('passes filtered props to a component', () => {
    const Component = (p: any) => <div {...p}>Component</div>
    const HOC = withFilters(filterCb, Component)
    const wrapper = mount(<HOC {...props} />)

    expect(wrapper.props()).toMatchObject({ a: 1, c: 2 })
  })
})
