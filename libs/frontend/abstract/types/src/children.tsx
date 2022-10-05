/**
 * Children as a function
 */
export type RenderChildren<P> = (props: P) => JSX.Element

export type PropsWithRenderChildren<P, T> = (
  props: P & { children: RenderChildren<T> },
) => unknown
