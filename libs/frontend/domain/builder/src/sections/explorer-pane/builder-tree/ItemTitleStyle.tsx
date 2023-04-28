import type { DataNode } from 'antd/lib/tree'
import type { PropsWithChildren } from 'react'
import React, { useRef } from 'react'
import tw from 'twin.macro'

/**
 */
const ItemTitle = ({
  children,
  className,
  node,
}: PropsWithChildren<{ className?: string; node: DataNode }>) => {
  const treeNodeRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className={`${className}`} ref={treeNodeRef}>
      {children}
    </div>
  )
}

export const ItemTitleStyle = tw(ItemTitle)`
  w-full
  whitespace-nowrap
  overflow-hidden
  overflow-ellipsis
`
