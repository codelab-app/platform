import { ITypeExport } from '@codelab/shared/abstract/core'
import { cLog } from '@codelab/shared/utils'
import { upsertTypeById } from '../../repository/type.repo'

export const importTypesById = async (
  types: Array<ITypeExport> = [],
  selectedUser: string,
) => {
  console.log('Importing types...\n')

  for (const type of types) {
    console.log('\n---------------------\n')
    console.log(`Upserting ${type.name}:`)
    cLog(type)
    console.log('\n')
    await upsertTypeById(type, selectedUser)
  }
}

/**
 * For parsing data, we'll want to upsert by ID since new data is generated
 *
 * @param types
 * @param selectedUser
 */
export const importTypesByName = async (
  types: Array<ITypeExport> = [],
  selectedUser: string,
) => {
  console.log('Importing types...\n')

  for (const type of types) {
    console.log('\n---------------------\n')
    console.log(`Upserting ${type.name}:`)
    cLog(type)
    console.log('\n')
    await upsertTypeById(type, selectedUser)
  }
}
