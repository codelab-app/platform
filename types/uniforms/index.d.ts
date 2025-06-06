import type { FilterDOMProps } from 'uniforms'

declare module 'uniforms' {
  interface FilterDOMProps {
    nullable: boolean
    isTypedProp: boolean
    forbiddenValues: Array<string>
    decimal: boolean
  }
}
