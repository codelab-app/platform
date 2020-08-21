import { render } from '@testing-library/react'
import { ReactNodeI } from '@codelab/graph'
import React from 'react'
import { TreeDom } from '../../renderer/TreeDom'

describe('Skeleton', () => {
  it('should render with text', () => {
    const skeleton: ReactNodeI = {
      type: 'Html.div',
      nodeType: 'React',
      props: { 'data-testid': 'skeleton' },
      children: [
        {
          type: 'Skeleton',
          nodeType: 'React',
          props: {
            active: 'true',
            paragraph: 'true',
            title: 'true',
          },
        },
      ],
    }

    const Skeleton = TreeDom.render(skeleton)

    const { getByTestId } = render(<Skeleton />)

    expect(getByTestId('skeleton')).toBeTruthy()
    expect(getByTestId('skeleton').children[0]).toHaveClass('ant-skeleton')
  })
})
