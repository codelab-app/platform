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
  const treeNodeWrapper = useRef<Element | null>(null)

  // console.log(node)
  //
  // // Empty dep executes after first render
  // useEffect(() => {
  //   if (!treeNodeRef.current) {
  //     throw new Error('Ref should exist')
  //   }
  //
  //   console.log('node changed', treeNodeRef.current)
  //
  //   treeNodeWrapper.current = getTreeNodeWrapper(treeNodeRef)
  // }, [node, treeNodeWrapper.current?.classList])
  //
  // useEffect(() => {
  //   console.log('treeNodeWrapper changed', treeNodeWrapper.current)
  //
  //   addUnselectableNodeClassName(node, treeNodeWrapper.current)
  // }, [treeNodeWrapper.current?.classList])

  return (
    <div className={`${className}`} ref={treeNodeRef}>
      {children}
    </div>
  )
}

export const ItemTitleStyle = tw(ItemTitle)`


`
