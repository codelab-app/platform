import { fireEvent, getByTitle, render, waitFor } from '@testing-library/react'
import React from 'react'
import { Default } from './Transfer.stories'

describe('Transfer', () => {
  it('should render with text', () => {
    const { getByText, getByLabelText } = render(<Default />)

    expect(getByText('Source')).toBeTruthy()
    expect(getByText('Target')).toBeTruthy()

    const source = getByText('Source').parentElement?.parentElement
    const target = getByText('Target').parentElement?.parentElement

    if (!source || !target) {
      throw new Error('missing source or target')
    }

    expect(getByTitle(source, 'content1')).toBeTruthy()
    expect(getByTitle(source, 'content2')).toBeTruthy()
    expect(getByTitle(source, 'content3')).toBeTruthy()

    expect(getByTitle(target, 'content4')).toBeTruthy()
    expect(getByTitle(target, 'content5')).toBeTruthy()

    expect(getByTitle(source, 'content2')).toHaveClass(
      'ant-transfer-list-content-item-disabled',
    )

    expect(getByLabelText('right')).toBeTruthy()
    expect(getByLabelText('left')).toBeTruthy()
  })

  it('Source to Target transfer should work', async () => {
    const { getByText, getByLabelText } = render(<Default />)

    const source = getByText('Source').parentElement?.parentElement as any
    const content1 = getByTitle(source, 'content1')
    const rightBtn = getByLabelText('right')

    fireEvent.click(content1)

    await waitFor(() => {
      expect(content1).toHaveClass('ant-transfer-list-content-item-checked')
      expect(rightBtn.parentElement).not.toBeDisabled()
    })

    fireEvent.click(rightBtn)

    await waitFor(() => {
      expect(
        getByTitle(
          getByText('Target').parentElement?.parentElement as any,
          'content1',
        ),
      ).toBeTruthy()
    })
  })

  it('Target to Source transfer should work', async () => {
    const { getByText, getByLabelText } = render(<Default />)

    const target = getByText('Target').parentElement?.parentElement
    const content4 = getByTitle(target!, 'content4')
    const leftBtn = getByLabelText('left')

    fireEvent.click(content4)

    await waitFor(() => {
      expect(content4).toHaveClass('ant-transfer-list-content-item-checked')
      expect(leftBtn.parentElement).not.toBeDisabled()
    })

    fireEvent.click(leftBtn)

    await waitFor(() => {
      expect(
        getByTitle(
          getByText('Source').parentElement?.parentElement as any,
          'content4',
        ),
      ).toBeTruthy()
    })
  })

  it('selection All should work', async () => {
    const { getByText, getByLabelText } = render(<Default />)

    const allSource = document.querySelectorAll('.ant-checkbox-wrapper')[0]
    const source = getByText('Source').parentElement?.parentElement
    const content1 = getByTitle(source!, 'content1')
    const content3 = getByTitle(source!, 'content3')
    const rightBtn = getByLabelText('right')

    fireEvent.click(allSource)

    await waitFor(() => {
      expect(content1).toHaveClass('ant-transfer-list-content-item-checked')
      expect(content3).toHaveClass('ant-transfer-list-content-item-checked')
      expect(rightBtn.parentElement).not.toBeDisabled()
    })

    fireEvent.click(rightBtn)

    await waitFor(() => {
      expect(
        getByTitle(
          getByText('Target').parentElement?.parentElement as any,
          'content1',
        ),
      ).toBeTruthy()
      expect(
        getByTitle(
          getByText('Target').parentElement?.parentElement as any,
          'content3',
        ),
      ).toBeTruthy()
    })
  })
})
