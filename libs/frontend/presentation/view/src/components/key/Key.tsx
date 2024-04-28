import React from 'react'
import { css } from 'styled-components'

export const Key = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <kbd
      className="rounded border border-gray-200 px-1 py-0.5 text-xs text-gray-600"
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
        // font-mono failed
      ]}
    >
      {children}
    </kbd>
  )
}

Key.displayName = 'Key'
