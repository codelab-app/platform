import type { FilterDOMProps } from 'uniforms'

declare module 'uniforms' {
  interface FilterDOMProps {
    nullable: boolean
  }
}
