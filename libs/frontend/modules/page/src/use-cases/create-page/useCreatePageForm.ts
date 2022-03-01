import {
  CRUDActionType,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { useCurrentAppId } from '@codelab/frontend/modules/app'
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
  const currentAppId = useCurrentAppId()
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
        create: { node: { name: ROOT_ELEMENT_NAME } },
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
    model: { appId: currentAppId },
    isLoading,
    actionType,
    reset: resetModal,
  }
}
