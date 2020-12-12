import { render } from '@testing-library/react'
import React from 'react'
import { Renderer } from '@codelab/alpha/core/renderer'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

describe('Skeleton', () => {
  it('should render with text', () => {
    const skeleton: NodeReactI = {
      type: NodeType.React_Html_Div,

      props: { 'data-testid': 'skeleton' },
      children: [
        {
          type: NodeType.React_Skeleton,
          props: {
            active: 'true',
            paragraph: 'true',
            title: 'true',
          },
        },
      ],
    }

    const Skeleton = Renderer.components(skeleton)

    const { getByTestId } = render(<Skeleton />)

    expect(getByTestId('skeleton')).toBeTruthy()
    expect(getByTestId('skeleton').children[0]).toHaveClass('ant-skeleton')
  })
})
