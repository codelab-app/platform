import { ButtonProps, TextProps } from '@codelab/ui'
import { ReactNodeI } from '@codelab/graph'
import { WebAppProduct } from '../../products/web/WebApp-product'
import { AppBuilder } from '../App-builder.i'
import { AppWebBuilder } from './AppWeb-builder'

describe('Web App Builder', () => {
  let product: WebAppProduct

  beforeAll(() => {
    const building: AppBuilder = new AppWebBuilder()
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

    product = building.buildProduct(reactNode)
  })

  // it('builds the product', () => {})

  it('renders a UI', () => {
    // const { Component } = product
    // const { getByText } = render(<Component />)
    // expect(getByText('Click me')).toBeTruthy()
  })
})
