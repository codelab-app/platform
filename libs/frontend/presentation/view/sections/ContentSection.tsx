import type { PropsWithChildren } from 'react'
import React from 'react'
import tw from 'twin.macro'
import { padding } from '../style'

export const ContentSection = ({
  children,
}: PropsWithChildren<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
>) => {
  return (
    <section css={tw`w-full h-full`} style={{ marginTop: padding.sm }}>
      {children}
    </section>
  )
}
