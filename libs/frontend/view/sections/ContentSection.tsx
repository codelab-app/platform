import type { PropsWithChildren } from 'react'
import React from 'react'
import { padding } from '../style'

export const ContentSection = ({
  children,
}: PropsWithChildren<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
>) => {
  return <section style={{ marginTop: padding.sm }}>{children}</section>
}
