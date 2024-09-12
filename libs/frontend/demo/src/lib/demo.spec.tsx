import { render } from '@testing-library/react'

import Demo from './demo'

describe('Demo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Demo />)
    expect(baseElement).toBeTruthy()
  })
})
