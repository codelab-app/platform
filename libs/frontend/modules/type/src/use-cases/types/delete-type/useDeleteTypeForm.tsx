import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { EmptyJsonSchemaType } from '@codelab/frontend/view/components'
import { useCallback } from 'react'
import { TypeFragment } from '../../../graphql'
import { useDeleteType, useTypeDispatch, useTypeState } from '../../../hooks'
import { useLazyGetTypeReferencesQuery } from '../../../store'

export const useDeleteTypeForm: UseEntityUseCaseForm<
  EmptyJsonSchemaType,
  CRUDActionType,
  TypeFragment
> = () => {
  const { resetModal } = useTypeDispatch()
  const { deleteIds, entity, actionType } = useTypeState()
  const deleteMutations = useDeleteType()
  const [getTypeReferences] = useLazyGetTypeReferencesQuery()

  const handleSubmit = useCallback(async () => {
    const kind = entity?.typeKind

    if (!kind) {
      throw new Error('useDeleteTypeForm: TypeKind is not defined')
    }

    // Make sure this type is not referenced anywhere else or the data may become corrupt
    const typeRefs = await getTypeReferences({
      variables: { typeId: deleteIds[0] },
    })

    if (typeRefs.data?.getTypeReferences?.length) {
      throw new Error(
        `Can't delete typed since it's referenced in ${Array.from(
          new Set(
            typeRefs.data.getTypeReferences.map(
              (ref) => `${ref.name} (${ref.label})`,
            ),
          ),
        ).join(', ')}`,
      )
    }

    const mutator = deleteMutations[kind as keyof typeof deleteMutations][0]

    return mutator({ variables: { where: { id: deleteIds[0] } } }).unwrap()
  }, [
    deleteIds,
    deleteMutations,
    entity?.id,
    entity?.typeKind,
    getTypeReferences,
  ])

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting type',
        type: 'error',
      }),
    ],
    model: { ...entity },
    actionType,
    onSubmitSuccess: [() => resetModal()],
    isLoading: Object.values(deleteMutations).some((m) => m[1].isLoading),
    entity,
    reset: resetModal,
  }
}
