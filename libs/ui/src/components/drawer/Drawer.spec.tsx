import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { Default } from './Drawer.stories'

describe('Drawer', () => {
  it('should render with text', () => {
    const { getByText, getAllByText, getByLabelText } = render(<Default />)

    expect(getByText('Open')).toBeTruthy()

    fireEvent.click(getByText('Open'))

    expect(getByText('Basic Drawer')).toBeTruthy()
    expect(getAllByText('Some contents...')).toHaveLength(3)
    expect(getByLabelText('Close')).toBeTruthy()

    fireEvent.click(getByLabelText('Close'))

    expect(document.body.querySelector('.ant-drawer-open')).toBeFalsy()
  })
})
