import CheckOutlined from '@ant-design/icons/CheckOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import DragOutlined from '@ant-design/icons/DragOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import {
  BuilderDndAction,
  type BuilderDragData,
} from '@codelab/frontend/abstract/application'
import { MakeChildrenDraggable } from '@codelab/frontend/application/dnd'
import {
  useResizeAwareRect,
  useScroll,
  useScrollIntoView,
} from '@codelab/frontend/shared/utils'
import type { Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import type { CSSProperties } from 'react'
import React, { useMemo } from 'react'
import styled from 'styled-components'

const TOOLBAR_HEIGHT = 30

const StyledOverlayContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-height: 20px;
  justify-content: space-between;
  & > *:not(:last-child) {
    margin-right: 0.3rem;
  }
`

const StyledSpan = styled.p`
  height: 20px;
  min-width: 50px;
  margin: 2px;
  overflow: hidden;
  white-space: nowrap;
`

const StyledOverlayButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`

export interface ElementOverlayProps {
  autoScroll?: boolean
  color?: string
  parentContainer?: Nullable<HTMLElement>
  rootContainer: HTMLElement
  targetBoundingRect: DOMRect
  toolbar: {
    editText?: {
      isTextEditable: boolean
      toggle(event: React.MouseEvent): void
    }
    title: string
    draggable?: {
      id: string
    }
    onDelete?(event: React.MouseEvent): void
  }
}

export const ElementOverlay = observer<ElementOverlayProps>(
  ({
    autoScroll,
    color,
    parentContainer,
    rootContainer,
    targetBoundingRect,
    toolbar,
  }) => {
    const containerBoundingRect = useResizeAwareRect(rootContainer)
    const scrollContainer = parentContainer || rootContainer

    const isToolbarVisible =
      targetBoundingRect.top - containerBoundingRect.top > TOOLBAR_HEIGHT

    const targetPoint = useMemo(() => {
      const parentBoundingRect = scrollContainer.getBoundingClientRect()

      return {
        x:
          targetBoundingRect.left +
          targetBoundingRect.width / 2 -
          parentBoundingRect.left,
        y:
          targetBoundingRect.top +
          targetBoundingRect.height / 2 -
          parentBoundingRect.top,
      }
    }, [targetBoundingRect, scrollContainer])

    if (autoScroll) {
      useScrollIntoView(targetPoint, scrollContainer)
      useScroll()
    }

    const rootStyle: CSSProperties = useMemo(
      () => ({
        borderRadius: '3px',

        bottom: `${targetBoundingRect.bottom}px`,

        height: `${targetBoundingRect.height}px`,

        left: `${targetBoundingRect.left - containerBoundingRect.left}px`,
        outline: `2px solid ${color || '#43669A'}`,
        pointerEvents: 'none',
        position: 'fixed',
        right: `${targetBoundingRect.right}px`,
        top: `${targetBoundingRect.top - containerBoundingRect.top}px`,
        width: `${targetBoundingRect.width}px`,
        zIndex: 3,
      }),
      [containerBoundingRect, targetBoundingRect, color],
    )

    const toolbarStyle: CSSProperties = useMemo(() => {
      // align toolbar top if there is enough screen space,
      // otherwise align toolbar under the element
      const styleName = isToolbarVisible ? 'bottom' : 'top'

      return {
        alignItems: 'center',
        backgroundColor: color || '#43669A',
        borderRadius: isToolbarVisible
          ? '12px 12px 12px 0'
          : '0 12px 12px 12px',
        color: 'rgb(255, 255, 255)',
        display: 'flex',
        fontSize: '0.8rem',
        height: TOOLBAR_HEIGHT,
        justifyContent: 'center',
        marginLeft: '-2px',
        padding: '0.1rem 0.3rem 0.1rem 0.3rem',
        pointerEvents: 'auto',
        position: 'absolute',
        [styleName]: '100%',
      }
    }, [isToolbarVisible, color])

    return (
      <div style={rootStyle}>
        <div style={toolbarStyle}>
          <StyledOverlayContainer>
            <StyledOverlayButtonGroup>
              {toolbar.onDelete && (
                <div
                  className="flex size-7 cursor-pointer items-center justify-center align-middle"
                  onClick={toolbar.onDelete}
                >
                  <div
                    className="flex size-5 items-center justify-center rounded-full align-middle"
                    style={{ backgroundColor: '#375583', color: 'red' }}
                  >
                    <DeleteOutlined />
                  </div>
                </div>
              )}
              {toolbar.draggable && (
                <MakeChildrenDraggable<BuilderDragData>
                  data={{
                    action: BuilderDndAction.MoveElement,
                  }}
                  id={toolbar.draggable.id}
                >
                  <div className="flex size-7 items-center justify-center align-middle">
                    <div
                      className="flex size-5 items-center justify-center rounded-full align-middle"
                      style={{ backgroundColor: '#375583', color: 'white' }}
                    >
                      <DragOutlined color="white" />
                    </div>
                  </div>
                </MakeChildrenDraggable>
              )}
              {toolbar.editText && (
                <div
                  className="flex size-7 cursor-pointer items-center justify-center align-middle"
                  onClick={toolbar.editText.toggle}
                >
                  <div
                    aria-label="Toggle Content Editing"
                    className="flex size-5 items-center justify-center rounded-full align-middle"
                    style={{ backgroundColor: '#375583', color: 'white' }}
                  >
                    {toolbar.editText.isTextEditable ? (
                      <CheckOutlined />
                    ) : (
                      <EditOutlined />
                    )}
                  </div>
                </div>
              )}
            </StyledOverlayButtonGroup>
            <StyledSpan>{toolbar.title}</StyledSpan>
          </StyledOverlayContainer>
        </div>
      </div>
    )
  },
)
