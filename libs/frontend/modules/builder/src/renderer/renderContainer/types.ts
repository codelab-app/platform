import { PropsWithChildren } from 'react'
import { RenderContext } from '../pipes'

export type RenderContainerProps = PropsWithChildren<{
  context?: RenderContext
  /** Used for inspecting root element */
  isRoot?: boolean
}>
