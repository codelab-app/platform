import type { ComponentType, PropsWithChildren, ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { MakeChildrenDraggable } from '../MakeChildrenDraggable'
import { MakeChildrenDroppable } from '../MakeChildrenDroppable'
import { MakeComponentDroppable } from '../MakeComponentDroppable'
import type { Hierarchy } from './test-data'

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
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Wrapper {...wrapperProps}>{children}</Wrapper>
  }

  return children
}

interface MakeElementTreeProps {
  customDragOverlay?: ReactNode
  hierarchy: Hierarchy
  makeComponentDroppable?: boolean
}

export const MakeElementTree = ({
  customDragOverlay,
  hierarchy,
  makeComponentDroppable,
}: MakeElementTreeProps) => {
  const keys = Object.keys(hierarchy)

  return keys.map((key) => {
    const node = hierarchy[key]

    if (!node) {
      return null
    }

    const { children, parentId, style, tobe } = node

    return (
      <WrapIf
        Wrapper={MakeChildrenDroppable}
        condition={
          !makeComponentDroppable && (tobe === 'droppable' || tobe === 'both')
        }
        key={key}
        wrapperProps={{
          data: {},
          id: key,
          parentDroppableContainerId: `${parentId}` || '',
          wrapperStyles: style,
        }}
      >
        <WrapIf
          Wrapper={MakeChildrenDraggable}
          condition={tobe === 'draggable' || tobe === 'both'}
          key={key}
          wrapperProps={{
            customOverlay: customDragOverlay,
            data: {},
            id: key,
            wrapperStyles: style,
          }}
        >
          {makeComponentDroppable &&
          (tobe === 'droppable' || tobe === 'both') ? (
            <MakeComponentDroppable
              ReactComponent={forwardRef(
                (props: PropsWithChildren, ref: Ref<HTMLDivElement>) => (
                  <div
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...props}
                    ref={ref}
                  >
                    {props.children}
                  </div>
                ),
              )}
              children={
                children && (
                  <MakeElementTree
                    customDragOverlay={customDragOverlay}
                    hierarchy={children}
                    key={`subtree-${key}`}
                    makeComponentDroppable={true}
                  />
                )
              }
              componentProps={{
                id: key,
                key,
                style,
              }}
              data={{}}
              id={key}
              key={key}
              parentDroppableContainerId={`${parentId}` || ''}
            />
          ) : (
            <div
              children={
                children && (
                  <MakeElementTree
                    customDragOverlay={customDragOverlay}
                    hierarchy={children}
                    key={`subtree-${key}`}
                  />
                )
              }
              id={key}
              key={key}
              style={style}
            />
          )}
        </WrapIf>
      </WrapIf>
    )
  })
}
