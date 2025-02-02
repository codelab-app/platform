import type { IRendererModel } from './renderer.model.interface'

export type IRootRenderer = React.JSXElementConstructor<{
  ref?: React.RefObject<HTMLDivElement | null>
  renderer: IRendererModel
}>
