import React from 'react'
import { render } from '@testing-library/react'
import { UIBuilding, UIOrder } from './UI-building.interface'
import { UIWebBuilding } from './UIWeb-building'
import { UIWebProduct } from '../products/UIWeb-product'

describe('Web UI Building', () => {
  it('renders a UI', () => {
    const building: UIBuilding = new UIWebBuilding()

    const order: UIOrder = {}

    const product: UIWebProduct = building.build(order)

    const { Component } = product

    const { getByText } = render(<Component />)

    expect(getByText('Click me')).toBeTruthy()
  })
})
