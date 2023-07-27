import type { PropsWithChildren } from 'react'
import React from 'react'
import { padding } from '../style'

export const ContentSection = ({
  children,
}: PropsWithChildren<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
>) => {
  return (
    <section className="h-full w-full" style={{ marginTop: padding.sm }}>
      {children}
    </section>
  )
}
