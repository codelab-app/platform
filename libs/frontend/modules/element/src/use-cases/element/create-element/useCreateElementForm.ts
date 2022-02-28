import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ElementCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { useCallback, useRef } from 'react'
import { useElementDispatch, useElementState } from '../../../hooks'
import { useCreateElementsMutation } from '../../../store'
import { CreateElementInput } from './types'

export type ParentElementId = Partial<
  Pick<CreateElementInput, 'parentElementId'>
>

const mapVariables = (input: CreateElementInput): ElementCreateInput => {
  const {
    parentElementId,
    instanceOfComponentId,
    atomId,
    order,
    propsData,
    ...data
  } = input

  const instanceOfComponent: ElementCreateInput['instanceOfComponent'] =
    instanceOfComponentId
      ? { connect: { where: { node: { id: instanceOfComponentId } } } }
      : undefined

  const atom: ElementCreateInput['atom'] = atomId
    ? { connect: { where: { node: { id: atomId } } } }
    : undefined

  const parentElement: ElementCreateInput['parentElement'] = parentElementId
    ? {
        connect: {
          where: { node: { id: parentElementId } },
          edge: { order },
        },
      }
    : undefined

  const props: ElementCreateInput['props'] = propsData
    ? { create: { node: { data: propsData } } }
    : undefined

  return {
    instanceOfComponent,
    atom,
    parentElement,
    props,
    ...data,
  }
}

export const useCreateElementForm: UseUseCaseForm<
  CreateElementInput,
  CRUDActionType,
  unknown,
  ParentElementId
> = (initialData) => {
  const { createMetadata, actionType } = useElementState()
  const initialDataRef = useRef(initialData)
  const { resetModal } = useElementDispatch()

  const [mutate, { isLoading }] = useCreateElementsMutation({
    selectFromResult: (r) => ({
      element: r.data?.createElements,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (submitData: CreateElementInput) => {
      const input = mapVariables(submitData)

      return mutate({ variables: { input } }).unwrap()
    },
    [mutate],
  )

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating element',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: {
      parentElementId:
        createMetadata?.parentElementId ??
        initialDataRef.current?.parentElementId,
    },
    isLoading,
    reset: resetModal,
    actionType,
  }
}
