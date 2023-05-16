import styled from '@emotion/styled'
import React from 'react'

/* eslint-disable-next-line */
export interface FrontendPresentationCodelabUiProps {}

const StyledFrontendPresentationCodelabUi = styled.div`
  color: pink;
`

export const FrontendPresentationCodelabUi = (
  props: FrontendPresentationCodelabUiProps,
) => {
  return (
    <StyledFrontendPresentationCodelabUi>
      <h1>Welcome to FrontendPresentationCodelabUi!</h1>
    </StyledFrontendPresentationCodelabUi>
  )
}

export default FrontendPresentationCodelabUi
