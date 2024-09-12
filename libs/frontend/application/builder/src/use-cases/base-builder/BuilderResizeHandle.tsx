import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import type { ResizeHandlerSide } from '../../hooks'
import { useBuilderResizer } from '../../hooks'

type ResizeHandlerProps = PropsWithChildren<{
  side: ResizeHandlerSide
  hovered: boolean
  setHovered(hover: boolean): void
}>

const ResizeHandler = observer<ResizeHandlerProps>(
  ({ children, hovered, setHovered, side }) => {
    const { onPointerDown, onPointerMove, onPointerUp } =
      useBuilderResizer(side)

    const defaultClassNames = 'h-full w-[3px] bg-gray-200'

    let className = hovered
      ? `${defaultClassNames} bg-blue-400 cursor-col-resize`
      : defaultClassNames

    className = side === 'after' ? `${className} relative` : className

    return (
      <div
        className={className}
        onMouseLeave={() => {
          setHovered(false)
        }}
        onMouseOver={() => {
          setHovered(true)
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {children}
      </div>
    )
  },
)

export const BuilderResizeHandle = observer<PropsWithChildren>(
  ({ children }) => {
    const [hovered, setHovered] = useState(false)

    return (
      <>
        <ResizeHandler
          hovered={hovered}
          setHovered={setHovered}
          side="before"
        />
        {children}
        <ResizeHandler hovered={hovered} setHovered={setHovered} side="after">
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 bg-inherit">
            <div className="flex space-x-0.5 rounded-r bg-inherit p-1.5 pl-1">
              <div className="h-6 w-0.5 bg-black"></div>
              <div className="h-6 w-0.5 bg-black"></div>
            </div>
          </div>
        </ResizeHandler>
      </>
    )
  },
)
