import { useUser } from '@auth0/nextjs-auth0'
import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useAtomDispatch, useAtomState } from '../../hooks'
import { useCreateAtomsMutation } from '../../store'
import { makeTagConnectData } from '../helper'
import { CreateAtomInputSchema } from './createAtomSchema'

export const useCreateAtomForm: UseUseCaseForm<
  CreateAtomInputSchema,
  CRUDActionType
> = () => {
  const { resetModal } = useAtomDispatch()
  const { actionType } = useAtomState()
  const { user } = useUser()

  const [mutate, { isLoading }] = useCreateAtomsMutation({
    selectFromResult: (r) => ({
      atom: r.data?.createAtoms.atoms[0],
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: CreateAtomInputSchema) => {
      const connects = makeTagConnectData(input.tags || [])

      return mutate({
        variables: {
          input: [
            {
              name: input.name,
              type: input.type,
              tags: {
                connect: connects,
              },
              api: {
                create: {
                  node: {
                    name: `${input.name} API`,
                    owner: user
                      ? { connect: { where: { node: { auth0Id: user.sub } } } }
                      : undefined,
                  },
                },
              },
            },
          ],
        },
      }).unwrap()
    },
    [mutate, user],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating atom',
  })

  return {
    onSubmit,
    onSubmitError: [onSubmitError],
    onSubmitSuccess: [() => resetModal()],
    model: {},
    isLoading,
    reset: resetModal,
    actionType,
  }
}
