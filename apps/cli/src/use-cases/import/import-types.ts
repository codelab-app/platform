import { ITypeExport } from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/data'
import { upsertType } from '../../repository/type.repo'
import { logSection, logTask } from '../../shared/utils/log-task'

export const importTypes = async (
  types: Array<ITypeExport> = [],
  selectedUserId: string,
  where: BaseUniqueWhereCallback<ITypeExport>,
) => {
  logSection('Importing Types')

  for (const type of types) {
    logTask('Upserting type', type.name)
    await upsertType(type, selectedUserId, where)
  }
}
