import { render } from '@testing-library/react'
import React from 'react'
import { ReactNodeI } from '@codelab/shared/interface/node'
import { TreeDom } from '@codelab/core/renderer'

describe('BackTop', () => {
  const backtopData: ReactNodeI = {
    type: 'Html.div',
    nodeType: 'React',
    props: { style: { height: '500vh' } },
    children: [
      {
        type: 'Text',
        nodeType: 'React',
        props: { value: 'Scroll down to see the bottom-right gray button' },
      },
      {
        type: 'BackTop',
        nodeType: 'React',
        props: { visibilityHeight: 100, 'data-testid': 'backtop' },
      },
    ],
  }

  it('should render with text', async () => {
    const BackTop = TreeDom.render(backtopData)
    const { getByText, getByTestId } = render(<BackTop />)

    expect(
      getByText('Scroll down to see the bottom-right gray button'),
    ).toBeTruthy()
    expect(getByTestId('backtop')).toBeTruthy()
  })
})
