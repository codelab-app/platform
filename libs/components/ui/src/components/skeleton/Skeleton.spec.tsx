import { render } from '@testing-library/react'
import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

describe('Skeleton', () => {
  it('should render with text', () => {
    const skeleton: NodeDtoReactI = {
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

    const Skeleton = TreeDom.render(skeleton)

    const { getByTestId } = render(<Skeleton />)

    expect(getByTestId('skeleton')).toBeTruthy()
    expect(getByTestId('skeleton').children[0]).toHaveClass('ant-skeleton')
  })
})
