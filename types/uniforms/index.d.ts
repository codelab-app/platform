import type { FilterDOMProps } from 'uniforms'

declare module 'uniforms' {
  export type UnknownObject = Record<string, unknown>
  
  interface FilterDOMProps {
    nullable: boolean
    isTypedProp: boolean
    forbiddenValues: Array<string>
    decimal: boolean
  }
}
