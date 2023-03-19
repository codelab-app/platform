import type { ReactNode } from 'react'

/**
 * Children as a function
 */
export type RenderChildren<P> = (props?: P) => ReactNode | undefined

export type PropsWithRenderChildren<P, T> = P & {
  children: RenderChildren<T>
}
