import { css } from '@emotion/react'
import React from 'react'
import tw from 'twin.macro'

export const Key = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <kbd
      css={[
        css`
          background: white;
          background: radial-gradient(
            circle,
            rgba(245, 245, 245, 1) 0%,
            rgba(252, 252, 252, 1) 51%,
            rgba(245, 245, 245, 1) 100%
          );
        `,
        tw`rounded px-1 py-0.5 text-gray-600 border border-gray-200 text-xs font-mono`,
      ]}
    >
      {children}
    </kbd>
  )
}

Key.displayName = 'Key'
