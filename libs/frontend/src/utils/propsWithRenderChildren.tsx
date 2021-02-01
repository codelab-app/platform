import { ReactNode } from 'react'

export type PropsWithRenderChildren<P, T> = P & {
  children(props: T): ReactNode
}
