'use client'

import { useServerInsertedHTML } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export const StyledComponentsRegistry = ({ children }: PropsWithChildren) => {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()

    styledComponentsStyleSheet.instance.clearTag()

    return <>{styles}</>
  })

  if (typeof window !== 'undefined') {
    return <>{children}</>
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}
