/**
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245
 */
import type { CSSProp } from 'styled-components'

declare module 'react' {
  interface Attributes {
    css?: CSSProp
  }
}
