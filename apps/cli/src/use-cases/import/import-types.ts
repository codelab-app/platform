import { ITypeExport } from '@codelab/shared/abstract/core'
import { cLog } from '@codelab/shared/utils'
import { BaseUniqueWhere, upsertType } from '../../repository/type.repo'

export const importTypes = async (
  types: Array<ITypeExport> = [],
  selectedUser: string,
  extractWhere: (type: ITypeExport) => BaseUniqueWhere,
) => {
  console.log('Importing types...\n')

  for (const type of types) {
    console.log('\n---------------------\n')
    console.log(`Upserting ${type.name}:`)
    cLog(type)
    console.log('\n')
    await upsertType(type, selectedUser, extractWhere(type))
  }
}
