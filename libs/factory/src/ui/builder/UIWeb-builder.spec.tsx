import { TextProps, ButtonProps } from '@codelab/ui'
import { ReactNodeI } from '@codelab/graph'
import { UIWebBuilder } from './UIWeb-builder'
import { UIWebProduct } from '../products/UIWeb-product'
import { UIBuilder } from './UI-builder.interface'

describe('Web UI Building', () => {
  let product: UIWebProduct

  beforeAll(() => {
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

    product = building.buildProduct(reactNode)
  })

  // it('builds the product', () => {})

  it('renders a UI', () => {
    console.log(product)
    // const { Component } = product
    // const { getByText } = render(<Component />)
    // expect(getByText('Click me')).toBeTruthy()
  })
})
