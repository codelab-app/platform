import type { PropsWithChildren } from 'react'
import React from 'react'

export const ContentSection = ({
  children,
}: PropsWithChildren<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
>) => {
  return <section className="size-full">{children}</section>
}
