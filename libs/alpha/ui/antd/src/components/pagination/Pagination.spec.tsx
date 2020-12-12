import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Default } from './Pagination.stories'

describe('Pagination', () => {
  it('should render with titles and text', () => {
    const { getByTitle, getByText } = render(<Default />)

    expect(getByTitle('Previous Page')).toBeTruthy()
    expect(getByTitle('1')).toBeTruthy()
    expect(getByTitle('2')).toBeTruthy()
    expect(getByTitle('3')).toBeTruthy()
    expect(getByTitle('4')).toBeTruthy()
    expect(getByTitle('5')).toBeTruthy()
    expect(getByTitle('Next 5 Pages')).toBeTruthy()
    expect(getByTitle('10')).toBeTruthy()
    expect(getByTitle('Next Page')).toBeTruthy()
  })

  it('should render with proper status', () => {
    const { getByTitle } = render(<Default />)

    expect(getByTitle('Previous Page').children[0]).toBeDisabled()
    expect(getByTitle('Next Page').children[0]).not.toBeDisabled()
    expect(getByTitle('1')).toHaveClass('ant-pagination-item-active')
  })

  it('selection should work', () => {
    const { getByTitle } = render(<Default />)

    fireEvent.click(getByTitle('2'))

    expect(getByTitle('2')).toHaveClass('ant-pagination-item-active')
    expect(getByTitle('1')).not.toHaveClass('ant-pagination-item-active')
  })

  it('Previous Page should work properly', () => {
    const { getByTitle } = render(<Default />)
    const previousPage = getByTitle('Previous Page')

    expect(previousPage.children[0]).toBeDisabled()

    fireEvent.click(getByTitle('2'))

    expect(previousPage.children[0]).not.toBeDisabled()

    fireEvent.click(previousPage)

    expect(getByTitle('1')).toHaveClass('ant-pagination-item-active')
  })

  it('Next Page should work properly', () => {
    const { getByTitle } = render(<Default />)
    const nextPage = getByTitle('Next Page')

    expect(nextPage.children[0]).not.toBeDisabled()

    fireEvent.click(nextPage)

    expect(getByTitle('2')).toHaveClass('ant-pagination-item-active')

    fireEvent.click(getByTitle('10'))

    expect(nextPage.children[0]).toBeDisabled()
  })

  it('Next 5 Pages should work properly', () => {
    const { getByTitle } = render(<Default />)

    fireEvent.click(getByTitle('Next 5 Pages'))

    expect(getByTitle('6')).toBeTruthy()
    expect(getByTitle('7')).toBeTruthy()
    expect(getByTitle('8')).toBeTruthy()
    expect(getByTitle('6')).toHaveClass('ant-pagination-item-active')
  })
})
