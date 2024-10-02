import type { ComponentType, PropsWithChildren, ReactNode, Ref } from 'react'

import { forwardRef } from 'react'

import type { Hierarchy } from './test-data'

import { MakeChildrenDraggable } from '../components/MakeChildrenDraggable'
import { MakeChildrenDroppable } from '../components/MakeChildrenDroppable'
import { MakeComponentDroppable } from '../components/MakeComponentDroppable'

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

const ForwardedDiv = forwardRef(
  (props: PropsWithChildren, ref: Ref<HTMLDivElement>) => (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      ref={ref}
    >
      {props.children}
    </div>
  ),
)

ForwardedDiv.displayName = 'ForwardedDiv'

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
              ReactComponent={ForwardedDiv}
              componentProps={{
                id: key,
                key,
                style,
              }}
              data={{}}
              id={key}
              key={key}
              parentDroppableContainerId={`${parentId}` || ''}
            >
              {children && (
                <MakeElementTree
                  customDragOverlay={customDragOverlay}
                  hierarchy={children}
                  key={`subtree-${key}`}
                  makeComponentDroppable={true}
                />
              )}
            </MakeComponentDroppable>
          ) : (
            <div id={key} key={key} style={style}>
              {children && (
                <MakeElementTree
                  customDragOverlay={customDragOverlay}
                  hierarchy={children}
                  key={`subtree-${key}`}
                />
              )}
            </div>
          )}
        </WrapIf>
      </WrapIf>
    )
  })
}
