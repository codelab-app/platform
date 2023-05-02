import type {
  BuilderWidth,
  IBuilderService,
} from '@codelab/frontend/abstract/core'
import type { MotionProps, MotionValue, PanInfo } from 'framer-motion'
import { useMotionValue } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

type UseBuilderDragInput = Pick<IBuilderService, 'setCurrentBuilderWidth'> & {
  selectedWidth: BuilderWidth
  width?: BuilderWidth
}

export type DragHandleProps = Pick<
  MotionProps,
  | 'drag'
  | 'dragConstraints'
  | 'dragElastic'
  | 'dragMomentum'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'style'
>

export interface UseBuilderResize {
  containerProps: Pick<MotionProps, 'style'>
  isDragging: boolean
  width: MotionValue<number>
  xDragHandleProps: DragHandleProps
}

const clampSet = (
  mValue: MotionValue<number>,
  delta: number,
  minMax?: BuilderWidth,
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
  selectedWidth,
  setCurrentBuilderWidth,
  width,
}: UseBuilderDragInput): UseBuilderResize => {
  const [isDragging, setIsDragging] = useState(false)
  const mWidth = useMotionValue(width?.default ?? 0)

  const handleXDrag = useCallback(
    (event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => {
      clampSet(mWidth, info.delta.x, selectedWidth)

      const roundedWidth = Math.round(mWidth.get())
      setCurrentBuilderWidth({ ...selectedWidth, default: roundedWidth })
    },

    [mWidth, selectedWidth, setCurrentBuilderWidth],
  )

  const setInitialValue = useCallback(() => {
    setCurrentBuilderWidth(selectedWidth)
    mWidth.set(selectedWidth.default)
  }, [selectedWidth, mWidth, setCurrentBuilderWidth])

  useEffect(() => {
    setInitialValue()
  }, [selectedWidth])

  const commonDragProps: Partial<DragHandleProps> = {
    dragConstraints: { bottom: 0, left: 0, right: 0, top: 0 },
    dragElastic: 0,
    dragMomentum: false,
  }

  return {
    containerProps: {
      style: {
        cursor: isDragging ? 'col-resize' : undefined,
        maxHeight: '100%',
        maxWidth: '100%',
        width: mWidth,
      },
    },
    isDragging,
    width: mWidth,
    xDragHandleProps: {
      drag: 'x',
      onDrag: handleXDrag,
      onDragEnd: () => setIsDragging(false),
      onDragStart: () => setIsDragging(true),
      style: {
        cursor: 'col-resize',
        translateX: '0px !important',
      },
      ...commonDragProps,
    },
  }
}
