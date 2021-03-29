import {
  ArrowUpOutlined,
  DeleteOutlined,
  DragOutlined,
} from '@ant-design/icons'
import { useEditor, useNode } from '@craftjs/core'
import { Button } from 'antd'
import React, { useCallback, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

export const RenderNode = ({ render, ...props }: { render: any }) => {
  console.log(render, props)
  const { actions, query, connectors } = useEditor()

  const {
    id,
    isActive,
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => {
    console.log(node)

    return {
      isActive: node.events.selected,
      isHover: node.events.hovered,
      dom: node.dom,
      name: node.data.custom.displayName || node.data.displayName,
      moveable: query.node(node.id).isDraggable(),
      deletable: query.node(node.id).isDeletable(),
      parent: node.data.parent,
      props: node.data.props,
    }
  })

  // console.log(render, props, parent)

  const currentRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) {
        dom.classList.add('component-selected')
      } else {
        dom.classList.remove('component-selected')
      }
    }
  }, [dom, isActive, isHover])

  const getPos = useCallback((domE: HTMLElement | undefined | null) => {
    const { top, left, bottom } = domE
      ? domE.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 }

    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    }
  }, [])

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef

    if (!currentDOM || !dom) {
      return
    }

    const { top, left } = getPos(dom)

    currentDOM.style.top = top
    currentDOM.style.left = left
  }, [dom, getPos])

  useEffect(() => {
    document
      ?.querySelector('.craftjs-renderer')
      ?.addEventListener('scroll', scroll)

    return () => {
      document
        ?.querySelector('.craftjs-renderer')
        ?.removeEventListener('scroll', scroll)
    }
  }, [scroll])

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <div
              ref={currentRef as any}
              className="px-2 py-2 text-white bg-primary fixed flex items-center"
              style={{
                left: getPos(dom).left,
                top: getPos(dom).top,
                zIndex: 9999,
              }}
            >
              <h2 className="flex-1 mr-4">{name}</h2>
              {moveable ? (
                <Button
                  style={{ cursor: 'move' }}
                  icon={<DragOutlined />}
                  ref={drag}
                />
              ) : null}
              {id !== 'ROOT' && (
                <Button
                  icon={<ArrowUpOutlined />}
                  onClick={() => {
                    actions.selectNode(parent)
                  }}
                />
              )}
              {deletable ? (
                <Button
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    actions.delete(id)
                  }}
                  icon={<DeleteOutlined />}
                />
              ) : null}
            </div>,
            document.body,
          )
        : null}
      {render}
    </>
  )
}
