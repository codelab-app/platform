import { render } from '@testing-library/react'
import React from 'react'
import { Renderer } from '@codelab/alpha/core/renderer'
import { AtomType, NodeI } from '@codelab/frontend'

describe('Skeleton', () => {
  it('should render with text', () => {
    const skeleton: NodeI = {
      type: AtomType.ReactHtmlDiv,

      props: { 'data-testid': 'skeleton' },
      children: [
        {
          type: AtomType.ReactSkeleton,
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
