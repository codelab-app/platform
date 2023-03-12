import type {
  ExportedAdminData,
  IUserRef,
} from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TagRepository } from '@codelab/backend/domain/tag'
import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'

export class ImportAdminDataService extends IUseCase<IUserRef, void> {
  data: ExportedAdminData

  tagRepository = new TagRepository()

  atomRepository = new AtomRepository()

  fieldRepository = new FieldRepository()

  constructor(data: ExportedAdminData) {
    super()
    this.data = data
  }

  async _execute(owner: IUserRef) {
    /**
     * Type must be seeded first, so atom can reference it
     */
    for await (const type of [...this.data.types, ...this.data.apis]) {
      await TypeFactory.create(type, owner, (_type) => ({ id: _type.id }))
    }

    for await (const tag of this.data.tags) {
      await this.tagRepository.save(tag)
    }

    for await (const atom of this.data.atoms) {
      await this.atomRepository.save(atom)
    }

    for await (const field of this.data.apis.flatMap((api) => api.fields)) {
      await this.fieldRepository.save(field)
    }
  }
}
