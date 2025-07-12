import type { IRendererModel } from './renderer.model.interface'

export interface IRootRendererProps {
  containerStyle?: React.CSSProperties
  renderer: IRendererModel
}

export type IRootRenderer = React.JSXElementConstructor<
  {
    ref?: React.RefObject<HTMLDivElement | null>
  } & IRootRendererProps
>
