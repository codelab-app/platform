import { useCreateElementMutation } from '@codelab/frontend/modules/element'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useBuilderSelectedElement } from '../hooks'
import { builderSlice } from '../store'
import { BuilderDndType } from './BuilderDndType'
import { BuilderDragData } from './BuilderDragData'

export interface UseBuilderDnd {
  currentlyDragging?: BuilderDragData
  onDragStart: (data: DragStartEvent) => void
  onDragEnd: (data: DragEndEvent) => void
}

export const useBuilderDnd = (): UseBuilderDnd => {
  const dispatch = useDispatch()
  const state = useSelector((s) => s.builder.currentlyDragging)
  const [createElement] = useCreateElementMutation()
  const { setSelectedElement } = useBuilderSelectedElement()

  const onDragStart = useCallback(
    (e: DragStartEvent) => {
      const data = e.active.data.current as BuilderDragData | undefined

      if (data?.type === BuilderDndType.CreateElement) {
        dispatch(builderSlice.actions.setCurrentlyDragging(data))
      }
    },
    [dispatch],
  )

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      const data = e.active.data.current as BuilderDragData | undefined
      const overData = e.over?.data.current as BuilderDragData | undefined

      if (data?.type === BuilderDndType.CreateElement) {
        if (overData?.type === BuilderDndType.CreateElement) {
          if (data?.createElementInput || overData?.createElementInput) {
            const createElementInput = {
              ...(data?.createElementInput ?? {}),
              ...(overData?.createElementInput ?? {}),
            }

            createElement({ variables: { input: createElementInput } }).then(
              (el: any) => {
                setSelectedElement(el.data?.createElement.id)
              },
            )
          }
        }
      }

      dispatch(builderSlice.actions.setCurrentlyDragging(undefined))
    },
    [createElement, dispatch, setSelectedElement],
  )

  return {
    currentlyDragging: state,
    onDragStart,
    onDragEnd,
  }
}
