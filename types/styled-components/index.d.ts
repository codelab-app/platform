/**
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245
 */
import type { CSSProp } from 'styled-components'

declare module 'react' {
  /**
   * https://github.com/styled-components/styled-components/issues/2528#issuecomment-509780963
   */
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp
  }
}
