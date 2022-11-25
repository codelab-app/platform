import { DataNode } from 'antd/lib/tree'
import React, { PropsWithChildren, useRef } from 'react'
import tw from 'twin.macro'

/**
 */
const ItemTitle = ({
  node,
  className,
  children,
}: PropsWithChildren<{ className?: string; node: DataNode }>) => {
  const treeNodeRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className={`${className}`} ref={treeNodeRef}>
      {children}
    </div>
  )
}

export const ItemTitleStyle = tw(ItemTitle)`


`
