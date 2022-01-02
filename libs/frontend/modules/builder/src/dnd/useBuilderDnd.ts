import { useCreateElementMutation } from '@codelab/frontend/modules/element'
import { Maybe } from '@codelab/shared/abstract/types'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useBuilderDispatch, useBuilderSelectedElement } from '../hooks'
import { BuilderDndType } from './BuilderDndType'
import { BuilderDragData } from './BuilderDragData'

export interface UseBuilderDnd {
  currentlyDragging?: BuilderDragData
  onDragStart: (data: DragStartEvent) => void
  onDragEnd: (data: DragEndEvent) => void
}

export const useBuilderDnd = (): UseBuilderDnd => {
  const { setCurrentlyDragging } = useBuilderDispatch()
  const state = useSelector((s) => s.builder.currentlyDragging)
  const [createElement] = useCreateElementMutation()
  const { setSelectedElement } = useBuilderSelectedElement()

  const onDragStart = useCallback(
    (e: DragStartEvent) => {
      const data = e.active.data.current as Maybe<BuilderDragData>

      if (data?.type === BuilderDndType.CreateElement) {
        setCurrentlyDragging(data)
      }
    },
    [setCurrentlyDragging],
  )

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      const data = e.active.data.current as Maybe<BuilderDragData>
      const overData = e.over?.data.current as Maybe<BuilderDragData>

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

      setCurrentlyDragging(undefined)
    },
    [createElement, setCurrentlyDragging, setSelectedElement],
  )

  return {
    currentlyDragging: state,
    onDragStart,
    onDragEnd,
  }
}
