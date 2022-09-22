import { ITypeExport } from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/data'
import { upsertType } from '../../repository/type.repo'

export const importTypes = async (
  types: Array<ITypeExport> = [],
  selectedUserId: string,
  where: BaseUniqueWhereCallback<ITypeExport>,
) => {
  // console.log('Importing types...\n')

  for (const type of types) {
    console.log('\n---------------------\n')
    console.log(`Upserting ${type.name}:`)
    console.log('\n')
    await upsertType(type, selectedUserId, where)
  }
}
