import { AppWebProduct } from '../../products/web/AppWeb-product'
import { AppBuilder } from '../App-builder.i'
import { AppWebBuilder } from './AppWeb-builder'
import { Button, Text } from '@codelab/components/ui'
import { NodeDtoI } from '@codelab/shared/interface/node'

describe('Web App Builder', () => {
  let product: AppWebProduct

  beforeAll(() => {
    const building: AppBuilder = new AppWebBuilder()
    const reactNode: NodeDtoI<Button.Props | Text.Props> = {
      type: 'React.Button',
      props: {},
      children: [
        {
          type: 'React.Text',
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
