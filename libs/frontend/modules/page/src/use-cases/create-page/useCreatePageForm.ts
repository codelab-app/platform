import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { useAppState } from '@codelab/frontend/modules/app'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { PageCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { useCallback } from 'react'
import { usePageDispatch, usePageState } from '../../hooks'
import { useCreatePagesMutation } from '../../store'
import { CreatePageInput } from './types'

export const useCreatePageForm: UseUseCaseForm<
  CreatePageInput,
  CRUDActionType
> = () => {
  const { resetModal } = usePageDispatch()
  const { currentApp } = useAppState()
  const { actionType } = usePageState()

  const [mutate, { isLoading }] = useCreatePagesMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createPages,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: CreatePageInput) => {
      const { name, appId } = input

      const app: PageCreateInput['app'] = {
        connect: { where: { node: { id: appId } } },
      }

      const rootElement: PageCreateInput['rootElement'] = {
        create: { node: { name: 'Root Element' } },
      }

      return mutate({
        variables: { input: { name, app, rootElement } },
      }).unwrap()
    },
    [mutate],
  )

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating page',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: { appId: currentApp?.id },
    isLoading,
    actionType,
    reset: resetModal,
  }
}
