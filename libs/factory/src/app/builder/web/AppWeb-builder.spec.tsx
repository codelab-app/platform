import { Button, Text } from '@codelab/components/ui'
import { ReactNodeI } from '@codelab/shared/interface/node'
import { AppWebBuilder } from './AppWeb-builder'
import { AppWebProduct } from '../../products/web/AppWeb-product'
import { AppBuilder } from '../App-builder.i'

describe('Web App Builder', () => {
  let product: AppWebProduct

  beforeAll(() => {
    const building: AppBuilder = new AppWebBuilder()
    const reactNode: ReactNodeI<Button.Props | Text.Props> = {
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
