import { ITypeExport } from '@codelab/shared/abstract/core'
import { cLog } from '@codelab/shared/utils'
import { upsertType } from '../../repository/type.repo'

export const importType = async (
  types: Array<ITypeExport>,
  selectedUser: string,
) => {
  for (const type of types) {
    console.log('\n---------------------\n')
    console.log(`Upserting ${type.name}:`)
    cLog(type)
    console.log('\n')
    await upsertType(type, selectedUser)
  }
}
