import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Tree.stories'

describe('Tree', () => {
  it('should render with title', () => {
    const { getByTitle } = render(<Default />)

    expect(getByTitle('parent 1')).toBeTruthy()
    expect(getByTitle('parent 1-0')).toBeTruthy()
    expect(getByTitle('parent 1-1')).toBeTruthy()
    expect(getByTitle('leaf 1')).toBeTruthy()
    expect(getByTitle('leaf 2')).toBeTruthy()
    expect(getByTitle('sss')).toBeTruthy()

    expect(getByTitle('parent 1-0').parentElement).toHaveClass(
      'ant-tree-treenode-checkbox-checked',
    )
    expect(getByTitle('leaf 2').parentElement).toHaveClass(
      'ant-tree-treenode-checkbox-checked',
    )
  })
})
