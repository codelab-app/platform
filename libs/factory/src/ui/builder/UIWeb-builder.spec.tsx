import React from 'react'
import { render } from '@testing-library/react'
import { ButtonProps, TextProps } from '@codelab/ui'
import { UIBuilder } from './UI-builder.interface'
import { UIWebBuilder } from './UIWeb-builder'
import { UIWebProduct } from '../products/UIWeb-product'
import { ReactNodeI } from '../../../../graph/src'

describe('Web UI Building', () => {
  it('renders a UI', () => {
    const building: UIBuilder = new UIWebBuilder()
    const reactNode: ReactNodeI<ButtonProps | TextProps> = {
      nodeType: 'React',
      type: 'Button',
      props: {},
      children: [
        {
          nodeType: 'React',
          type: 'Text',
          props: {
            value: 'Click me',
          },
        },
      ],
    }
    const product: UIWebProduct = building.buildProduct(reactNode)
    const { Component } = product
    const { getByText } = render(<Component />)

    expect(getByText('Click me')).toBeTruthy()
  })
})
