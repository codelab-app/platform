import type {
  BuilderWidth,
  IBuilderService,
} from '@codelab/frontend/abstract/core'
import type { MotionProps, MotionValue, PanInfo } from 'framer-motion'
import { useMotionValue } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

type UseBuilderDragInput = {
  width?: BuilderWidth
  selectedWidth: BuilderWidth
} & Pick<IBuilderService, 'setCurrentBuilderWidth'>

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
  width,
  selectedWidth,
  setCurrentBuilderWidth,
}: UseBuilderDragInput): UseBuilderResize => {
  const [isDragging, setIsDragging] = useState(false)
  const mWidth = useMotionValue(width?.default ?? 0)

  const handleXDrag = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      clampSet(mWidth, info.delta.x, selectedWidth)

      const roundedWidth = Math.round(mWidth.get())
      setCurrentBuilderWidth({ ...selectedWidth, default: roundedWidth })
    },

    [mWidth, selectedWidth, setCurrentBuilderWidth],
  )

  useEffect(() => {
    if (!(selectedWidth.default && selectedWidth.max && selectedWidth.min)) {
      return
    }

    setCurrentBuilderWidth(selectedWidth)

    return mWidth.set(selectedWidth.default)
  }, [selectedWidth, mWidth, setCurrentBuilderWidth])

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
