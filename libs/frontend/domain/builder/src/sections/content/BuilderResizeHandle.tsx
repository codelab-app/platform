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
        className="h-full w-[3px] bg-gray-200 hover:cursor-col-resize hover:bg-blue-300 active:bg-blue-400"
        ref={beforeElementRef}
      />
      {children}
      <div
        className="relative h-full w-[3px] bg-gray-200 hover:cursor-col-resize hover:bg-blue-300 active:bg-blue-400"
        ref={afterElementRef}
      />
    </>
  )
}
