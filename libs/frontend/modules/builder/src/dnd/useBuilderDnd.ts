import { useCreateElementsMutation } from '@codelab/frontend/modules/element'
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
  const [createElement] = useCreateElementsMutation()
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

      const shouldCreate =
        data?.type === BuilderDndType.CreateElement &&
        overData?.type === BuilderDndType.CreateElement &&
        (data?.createElementInput || overData?.createElementInput)

      if (shouldCreate) {
        const createElementInput = {
          ...(data?.createElementInput ?? {}),
          ...(overData?.createElementInput ?? {}),
        }

        const { parentElementId, order, ...rest } = createElementInput
        createElement({
          variables: {
            input: {
              parentElement: {
                connect: {
                  where: { node: { id: parentElementId } },
                  edge: { order },
                },
              },
              ...rest,
            },
          },
        }).then((el: any) => {
          setSelectedElement(el.data?.createElement.id)
        })
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
