import type { ComponentType, PropsWithChildren } from 'react'

interface WrapIfProps<T> {
  Wrapper: ComponentType<T>
  condition: boolean
  wrapperProps: T
}

export const WrapIf = <T,>({
  children,
  condition,
  Wrapper,
  wrapperProps,
}: PropsWithChildren<WrapIfProps<T>>) => {
  if (condition) {
    return <Wrapper {...wrapperProps}>{children}</Wrapper>
  }

  return children
}
