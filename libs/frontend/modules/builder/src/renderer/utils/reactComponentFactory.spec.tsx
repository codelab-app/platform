import { AtomType } from '@codelab/shared/abstract/core'
import { commonProps, reactComponentFactory } from './reactComponentFactory'

const input = {
  atomType: AtomType.HtmlButton,
  node: { id: 'random-id' },
}

describe('ReactComponentFactory', () => {
  it('should return component and default props', () => {
    const output = reactComponentFactory(input)

    expect(output).toEqual(['button', commonProps(input.node.id)])
  })

  it('should return null for invalid input', () => {
    const output = reactComponentFactory({} as any)

    expect(output).toEqual([null, {}])
  })
})
