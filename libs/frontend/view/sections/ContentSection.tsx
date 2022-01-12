import React, { PropsWithChildren } from 'react'
import { padding } from '../style'

// export const StyledSection = styled.section(() => [tw`mt-4`])

export const ContentSection = ({
  children,
  ...props
}: PropsWithChildren<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
>) => {
  return (
    <section style={{ marginTop: padding.sm, ...props.style }} {...props}>
      {children}
    </section>
  )
}
