import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './Descriptions.stories'

describe('Descriptions', () => {
  it('should render with text', () => {
    const { getByText } = render(<Default />)

    expect(getByText('User Info')).toBeTruthy()
    expect(getByText('UserName')).toBeTruthy()
    expect(getByText('Zhou Maomao')).toBeTruthy()
    expect(getByText('Telephone')).toBeTruthy()
    expect(getByText('1810000000')).toBeTruthy()
    expect(getByText('Live')).toBeTruthy()
    expect(getByText('Hangzhou, Zhejiang')).toBeTruthy()
    expect(getByText('Address')).toBeTruthy()
    expect(
      getByText(
        'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
      ),
    ).toBeTruthy()
  })
})
