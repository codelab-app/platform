import { useStore } from '@codelab/frontend/presentation/container'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useRef } from 'react'
import type { Side } from './builder-resize-controller'
import { builderResizeController } from './builder-resize-controller'

const useResizer = ({ side }: { side: Side }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { builderService } = useStore()

  useEffect(() => {
    if (ref.current === null) {
      return
    }

    const disposeResizeController = builderResizeController(ref.current, {
      getDefaultValue: () => builderService.selectedBuilderWidth.default,

      getMaxValue: () => builderService.selectedBuilderWidth.max,

      getMinValue: () => builderService.selectedBuilderWidth.min,

      getSide: () => side,

      onValueChanged: (value) => {
        builderService.setSelectedBuilderWidth({
          ...builderService.selectedBuilderWidth,
          default: value,
        })
      },
    })

    return () => {
      disposeResizeController()
    }
  }, [side])

  return ref
}

export const BuilderResizeHandle = ({ children }: PropsWithChildren) => {
  const beforeElementRef = useResizer({ side: 'before' })
  const afterElementRef = useResizer({ side: 'after' })

  return (
    <>
      <div
        className="h-full w-[3px] bg-gray-200 hover:cursor-col-resize hover:bg-blue-400 active:bg-blue-400"
        ref={beforeElementRef}
      />
      {children}
      <div
        className="relative h-full w-[3px] bg-gray-200 hover:cursor-col-resize hover:bg-blue-400 active:bg-blue-400"
        ref={afterElementRef}
      >
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2">
          <div className="flex space-x-0.5 rounded-r bg-gray-200 p-1.5 pl-1 hover:bg-blue-400 active:bg-blue-400">
            <div className="h-6 w-0.5 bg-black"></div>
            <div className="h-6 w-0.5 bg-black"></div>
          </div>
        </div>
      </div>
    </>
  )
}
