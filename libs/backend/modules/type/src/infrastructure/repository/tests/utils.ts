import { ITransaction } from '@codelab/backend/infra'
import { IType } from '@codelab/shared/abstract/core'
import { ITypeRepository } from '../type/type-repository.interface'

export const typeCrudTest = async <TType extends IType>({
  initialType,
  repo,
  transaction,
  updateInput,
  onBeforeDelete,
  updateExpected,
  createExpected,
}: {
  initialType: TType
  updateInput: Partial<TType>
  updateExpected?: TType
  createExpected?: TType
  repo: ITypeRepository
  transaction: ITransaction
  onBeforeDelete?: (input: {
    type: TType
    updatedType: TType
  }) => void | Promise<void>
}) => {
  const { id } = await repo.create(initialType, transaction)
  const type = (await repo.getOne(id, transaction)) as TType

  expect(type).toBeDefined()
  expect(type).toEqual(createExpected ?? { ...initialType, id })

  const updateTypeFullInput = { ...type, ...updateInput }
  await repo.update(updateTypeFullInput, transaction)

  const updatedType = (await repo.getOne(id, transaction)) as TType

  expect(updatedType).toEqual(updateExpected ?? { ...updatedType, id })

  onBeforeDelete?.({ type, updatedType })
  await repo.delete(id, transaction)

  const getAfterDelete = await repo.getOne(id, transaction)

  expect(getAfterDelete).toBeUndefined()

  return {
    type,
    updatedType,
  }
}
