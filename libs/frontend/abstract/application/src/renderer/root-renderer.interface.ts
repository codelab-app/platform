import type { ReactElement } from 'react'
import type { IRendererModel } from './renderer.model.interface'

export type IRootRenderer = ({
  ref,
  renderer,
}: {
  ref?: React.RefObject<HTMLDivElement>
  renderer: IRendererModel
}) => ReactElement
