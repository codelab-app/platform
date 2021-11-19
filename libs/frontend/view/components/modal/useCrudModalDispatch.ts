import { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

export interface UseCrudModalActions<
  TDeletePayload,
  TUpdatePayload,
  TCreatePayload = undefined,
> {
  openCreateModal(payload: TCreatePayload): PayloadAction<TCreatePayload>
  resetModal(): PayloadAction
  openDeleteModal(payload: TDeletePayload): PayloadAction<TDeletePayload>
  openUpdateModal(payload: TUpdatePayload): PayloadAction<TUpdatePayload>
}

export const useCrudModalDispatch = <
  TDeletePayload,
  TUpdatePayload,
  TCreatePayload = undefined,
>(
  actions: UseCrudModalActions<TDeletePayload, TUpdatePayload, TCreatePayload>,
) => {
  const dispatch = useDispatch()

  const openCreateModal: TCreatePayload extends undefined
    ? () => void
    : (payload: TCreatePayload) => void = ((payload: TCreatePayload) => {
    dispatch(actions.openCreateModal(payload))
  }) as any

  const openDeleteModal = (payload: TDeletePayload) =>
    dispatch(actions.openDeleteModal(payload))

  const openUpdateModal = (payload: TUpdatePayload) => {
    dispatch(actions.openUpdateModal(payload))
  }

  const resetModal = () => {
    dispatch(actions.resetModal())
  }

  return {
    openCreateModal,
    openDeleteModal,
    openUpdateModal,
    resetModal,
  }
}

export const crudModalDispatchFactory =
  <TDeletePayload, TUpdatePayload, TCreatePayload = undefined>(
    actions: UseCrudModalActions<
      TDeletePayload,
      TUpdatePayload,
      TCreatePayload
    >,
  ) =>
  () =>
    useCrudModalDispatch(actions)
