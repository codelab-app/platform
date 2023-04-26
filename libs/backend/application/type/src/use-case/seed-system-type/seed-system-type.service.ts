import { IAuthUseCase, IUseCase } from '@codelab/backend/abstract/types'
import { TypeFactory } from '@codelab/backend/domain/type'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import { systemTypesData } from './system-types.data'

export class SeedSystemTypeService extends IAuthUseCase<void, void> {
  async _execute() {
    await Promise.all(
      Object.values(systemTypesData(this.owner)).map(
        async (systemTypeData) =>
          await TypeFactory.create(
            { ...systemTypeData, owner: this.owner },
            { name: systemTypeData.name },
          ),
      ),
    )
  }
}
