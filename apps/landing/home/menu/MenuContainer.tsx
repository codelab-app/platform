import { useMobileOrTabletMediaQuery } from '@codelab/frontend/shared/style'
import React, { PropsWithChildren, useState } from 'react'
import Sticky, { StatusCode } from 'react-stickynode'
import tw from 'twin.macro'

export const CodelabMenuContainer = ({ children }: PropsWithChildren<any>) => {
  // 0 STATUS_ORIGINAL
  // 1 STATUS_RELEASED
  // 2 STATUS_FIXED
  const [stickyStatus, setStickyStatus] = useState<StatusCode>(0)
  const isMobileOrTablet = useMobileOrTabletMediaQuery()
  const showStickyHeader = stickyStatus === 2

  return (
    <Sticky
      activeClass="shadow"
      enabled={true}
      innerZ={50}
      onStateChange={({ status }) => {
        setStickyStatus(status)
      }}
      top={0}
    >
      <div css={[tw`z-50 m-0 p-0`, showStickyHeader && tw`shadow`]}>
        {children}
      </div>
    </Sticky>
  )
}
