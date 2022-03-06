import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { difference } from 'lodash'
import { useCallback } from 'react'
import { useAtomDispatch, useAtomState } from '../../hooks'
import { useUpdateAtomsMutation } from '../../store'
import { CreateAtomInputSchema } from '../create-atom'
import { makeTagConnectData } from '../helper'

export const useUpdateAtomForm: UseUseCaseForm<
  CreateAtomInputSchema,
  CRUDActionType
> = () => {
  const { updateId, entity, actionType } = useAtomState()
  const { resetModal } = useAtomDispatch()

  const [mutate, { isLoading }] = useUpdateAtomsMutation({
    selectFromResult: (r) => ({
      atom: r.data?.updateAtoms.atoms[0],
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (data: CreateAtomInputSchema) => {
      const existingTagIds = entity?.tags?.map((tag) => tag.id) || []
      const connects = makeTagConnectData(difference(data.tags, existingTagIds))

      const disconnects = makeTagConnectData(
        difference(existingTagIds, data.tags || []),
      )

      return mutate({
        variables: {
          where: { id: updateId },
          update: {
            ...data,
            tags: [
              {
                connect: connects,
                disconnect: disconnects,
              },
            ],
          },
        },
      }).unwrap()
    },
    [mutate, updateId],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating atom',
  })

  return {
    onSubmit: onSubmit,
    onSubmitError: [onSubmitError],
    onSubmitSuccess: [() => resetModal()],
    model: {
      name: entity?.name,
      type: entity?.type,
      tags: entity?.tags?.map((tag) => tag.id) || [],
    },
    entity: entity,
    isLoading,
    actionType,
    reset: resetModal,
  }
}
