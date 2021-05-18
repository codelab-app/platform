import 'twin.macro'
import styledImport from '@emotion/styled'
import { css as cssImport, CSSObject } from '@emotion/react'
import { TwStyle } from 'twin.macro'

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport
  const css: typeof cssImport
}

// For the css prop
declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: TwStyle
  }
}
