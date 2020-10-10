import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Default } from './Upload.stories'

describe('Upload', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('Click to Upload')).toBeTruthy()

    const input = getByText('Click to Upload')
      .previousSibling as HTMLInputElement
    const file = new File(['hello'], 'hello.png', { type: 'React.image/png' })

    userEvent.upload(input, file)

    expect(input.files).toHaveLength(1)
    expect(input.files[0]).toStrictEqual(file)
  })
})
