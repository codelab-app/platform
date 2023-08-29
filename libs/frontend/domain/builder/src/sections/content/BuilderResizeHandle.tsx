import { defaultBuilderWidthBreakPoints } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useRef } from 'react'
import type { Side } from './builder-resize-controller'
import { builderResizeController } from './builder-resize-controller'

const useResizer = ({ side }: { side: Side }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { builderService } = useStore()
  const breakpoint = builderService.selectedBuilderBreakpoint

  useEffect(() => {
    if (ref.current === null) {
      return
    }

    const selectedBuilderWidth = defaultBuilderWidthBreakPoints[breakpoint]

    const disposeResizeController = builderResizeController(ref.current, {
      getDefaultValue: () => selectedBuilderWidth.default,
      getMaxValue: () =>
        Math.min(
          builderService.builderContainerWidth,
          selectedBuilderWidth.max,
        ),
      getMinValue: () => selectedBuilderWidth.min,
      getSide: () => side,
      onValueChanged: (value) => {
        builderService.setCurrentBuilderWidth({
          ...selectedBuilderWidth,
          default: value,
        })
      },
    })

    return () => {
      disposeResizeController()
    }
  }, [side, breakpoint])

  return ref
}

export const BuilderResizeHandle = ({ children }: PropsWithChildren) => {
  const beforeElementRef = useResizer({ side: 'before' })
  const afterElementRef = useResizer({ side: 'after' })
  const [hovered, setHovered] = React.useState(false)

  const getClassNames = () => {
    const defaultClassNames = 'h-full w-[3px] bg-gray-200'

    if (hovered) {
      return `${defaultClassNames} bg-blue-400 cursor-col-resize`
    }

    return defaultClassNames
  }

  return (
    <>
      <div
        className={getClassNames()}
        onMouseLeave={() => setHovered(false)}
        onMouseOver={() => setHovered(true)}
        ref={beforeElementRef}
      />
      {children}
      <div
        className={`${getClassNames()} relative`}
        onMouseLeave={() => setHovered(false)}
        onMouseOver={() => setHovered(true)}
        ref={afterElementRef}
      >
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 bg-inherit">
          <div className="flex space-x-0.5 rounded-r bg-inherit p-1.5 pl-1">
            <div className="h-6 w-0.5 bg-black"></div>
            <div className="h-6 w-0.5 bg-black"></div>
          </div>
        </div>
      </div>
    </>
  )
}
