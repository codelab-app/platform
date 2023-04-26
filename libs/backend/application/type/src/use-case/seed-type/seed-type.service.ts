import { IAuthUseCase, IUseCase } from '@codelab/backend/abstract/types'
import { TypeFactory } from '@codelab/backend/domain/type'
import type { IAuth0Owner, ITypeDTO } from '@codelab/frontend/abstract/core'
import { systemTypesData } from '../seed-system-type/system-types.data'

export class SeedTypeService extends IAuthUseCase<
  Record<string, ITypeDTO>,
  void
> {
  async _execute(types: Record<string, ITypeDTO>) {
    await Promise.all(
      Object.values(types).map(
        async (type) =>
          await TypeFactory.create(
            { ...type, owner: this.owner },
            { name: type.name },
          ),
      ),
    )
  }
}
