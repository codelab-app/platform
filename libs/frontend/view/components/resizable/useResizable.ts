import {
  MotionProps,
  MotionValue,
  PanInfo,
  useMotionValue,
} from 'framer-motion'
import { useCallback, useState } from 'react'

export interface MinMaxValue {
  min?: number
  max?: number
  default?: number
}

export interface UseResizableInput {
  width?: MinMaxValue
  height?: MinMaxValue
}

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

export interface UseResizable {
  isDragging: boolean
  isDraggingX: boolean
  isDraggingY: boolean
  xDragHandleProps: DragHandleProps
  yDragHandleProps: DragHandleProps
  xyDragHandleProps: DragHandleProps
  containerProps: Pick<MotionProps, 'style'>
  width: MotionValue<number>
  height: MotionValue<number>
}

const clampSet = (
  mValue: MotionValue<number>,
  delta: number,
  minMax?: MinMaxValue,
) => {
  let newWidth = mValue.get() + delta

  if (minMax?.min && newWidth < minMax.min) {
    newWidth = minMax.min
  }

  if (minMax?.max && newWidth > minMax.max) {
    newWidth = minMax.max
  }

  mValue.set(newWidth)
}

export const useResizable = ({
  width,
  height,
}: UseResizableInput): UseResizable => {
  const [isDraggingX, setIsDraggingX] = useState(false)
  const [isDraggingY, setIsDraggingY] = useState(false)
  const mWidth = useMotionValue(width?.default ?? 0)
  const mHeight = useMotionValue(height?.default ?? 0)

  const handleXDrag = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      clampSet(mWidth, info.delta.x, width)
    },
    [mWidth, width],
  )

  const handleYDrag = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      clampSet(mHeight, -info.delta.y, height)
    },
    [height, mHeight],
  )

  const handleXYDrag = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      handleXDrag(event, info)
      handleYDrag(event, info)
    },
    [handleXDrag, handleYDrag],
  )

  const commonDragProps: Partial<DragHandleProps> = {
    dragElastic: 0,
    dragMomentum: false,
    dragConstraints: { top: 0, left: 0, right: 0, bottom: 0 },
  }

  return {
    isDragging: isDraggingX || isDraggingY,
    isDraggingX,
    isDraggingY,
    containerProps: {
      style: {
        height: height ? mHeight : undefined,
        width: width ? mWidth : undefined,
        cursor: isDraggingX
          ? 'col-resize'
          : isDraggingY
          ? 'row-resize'
          : undefined,
        maxWidth: width?.max ? `${width.max}px` : undefined,
        maxHeight: height?.max ? `${height.max}px` : undefined,
      },
    },
    xDragHandleProps: {
      onDrag: handleXDrag,
      style: {
        cursor: 'col-resize',
      },
      onDragEnd: () => setIsDraggingX(false),
      onDragStart: () => setIsDraggingX(true),
      drag: 'x',
      ...commonDragProps,
    },
    xyDragHandleProps: {
      onDrag: handleXYDrag,
      style: {
        cursor: 'nwse-resize',
      },
      onDragEnd: () => {
        setIsDraggingX(false)
        setIsDraggingY(false)
      },
      onDragStart: () => {
        setIsDraggingX(true)
        setIsDraggingY(true)
      },
      drag: true,
      ...commonDragProps,
    },
    yDragHandleProps: {
      onDrag: handleYDrag,
      style: {
        cursor: 'row-resize',
      },
      onDragEnd: () => setIsDraggingY(false),
      onDragStart: () => setIsDraggingY(true),
      drag: 'y',
      ...commonDragProps,
    },
    width: mWidth,
    height: mHeight,
  }
}
