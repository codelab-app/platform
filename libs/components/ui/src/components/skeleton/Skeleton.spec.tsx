import { render } from '@testing-library/react'
import React from 'react'
import { Renderer } from '@codelab/core/renderer'
import { NodeReactI } from '@codelab/shared/interface/node'

describe('Skeleton', () => {
  it('should render with text', () => {
    const skeleton: NodeReactI = {
      type: 'React.Html.div',

      props: { 'data-testid': 'skeleton' },
      children: [
        {
          type: 'React.Skeleton',

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
