import type { IBuilderService } from '@codelab/frontend/abstract/core'
import type { MotionProps, MotionValue, PanInfo } from 'framer-motion'
import { useMotionValue } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

export interface MinMaxValue {
  min?: number
  max?: number
  default?: number
}

type UseBuilderDragInput = {
  width?: MinMaxValue
} & Pick<
  IBuilderService,
  | 'setResizingMainContent'
  | 'setMainResizingContentWidth'
  | 'setMainContentWidth'
>

export type DragHandleProps = Pick<
  MotionProps,
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDrag'
  | 'style'
  | 'drag'
  | 'dragElastic'
  | 'dragMomentum'
  | 'dragConstraints'
>

export interface UseBuilderResize {
  isDragging: boolean
  xDragHandleProps: DragHandleProps
  containerProps: Pick<MotionProps, 'style'>
  width: MotionValue<number>
}

const clampSet = (
  mValue: MotionValue<number>,
  delta: number,
  minMax?: MinMaxValue,
) => {
  let newValue = mValue.get() + delta

  if (minMax?.min && newValue < minMax.min) {
    newValue = minMax.min
  }

  if (minMax?.max && newValue > minMax.max) {
    newValue = minMax.max
  }

  mValue.set(newValue)
}

export const useBuilderResize = ({
  width,
  setResizingMainContent,
  setMainResizingContentWidth,
  setMainContentWidth,
}: UseBuilderDragInput): UseBuilderResize => {
  const [isDragging, setIsDragging] = useState(false)
  const mWidth = useMotionValue(width?.default ?? 0)

  const handleXDrag = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setResizingMainContent(true)
      clampSet(mWidth, info.delta.x, width)
      setMainResizingContentWidth(Math.round(mWidth.get()))
    },
    [mWidth, width],
  )

  useEffect(() => {
    if (!(width?.default && width.max && width.min)) {
      return
    }

    if (width.default > width.max) {
      setMainResizingContentWidth(width.max)

      return mWidth.set(width.max)
    }

    if (width.default < width.min) {
      setMainResizingContentWidth(width.min)

      return mWidth.set(width.min)
    }

    setMainContentWidth(width.default)

    return mWidth.set(width.default)
  }, [width?.default, width?.max])

  const commonDragProps: Partial<DragHandleProps> = {
    dragElastic: 0,
    dragMomentum: false,
    dragConstraints: { top: 0, left: 0, right: 0, bottom: 0 },
  }

  return {
    isDragging,
    containerProps: {
      style: {
        width: mWidth,
        cursor: isDragging ? 'col-resize' : undefined,
        maxWidth: '100%',
        maxHeight: '100%',
      },
    },
    xDragHandleProps: {
      onDrag: handleXDrag,
      style: {
        translateX: '0px !important',
        cursor: 'col-resize',
      },
      onDragEnd: () => setIsDragging(false),
      onDragStart: () => setIsDragging(true),
      drag: 'x',
      ...commonDragProps,
    },
    width: mWidth,
  }
}
