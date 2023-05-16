import { render } from '@testing-library/react'

import FrontendPresentationCodelabUi from './frontend-presentation--codelab-ui'

describe('FrontendPresentationCodelabUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendPresentationCodelabUi />)
    expect(baseElement).toBeTruthy()
  })
})
