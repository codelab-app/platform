import { render } from '@testing-library/react'
import React from 'react'
import { Renderer } from '@codelab/alpha/core/renderer'
import { AtomType, NodeI } from '@codelab/frontend'

describe('BackTop', () => {
  const backtopData: NodeI = {
    type: AtomType.ReactHtmlDiv,
    props: { style: { height: '500vh' } },
    children: [
      {
        type: AtomType.ReactText,
        props: { value: 'Scroll down to see the bottom-right gray button' },
      },
      {
        type: AtomType.ReactBackTop,
        props: { visibilityHeight: 100, 'data-testid': 'backtop' },
      },
    ],
  }

  it('should render with text', () => {
    const BackTop = Renderer.components(backtopData)
    const { getByText, getByTestId } = render(<BackTop />)

    expect(
      getByText('Scroll down to see the bottom-right gray button'),
    ).toBeTruthy()
    expect(getByTestId('backtop')).toBeTruthy()
  })
})
