import type { IUserRef } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { SeedAtomsService } from '@codelab/backend/application/atom'
import { SeedTagsService } from '@codelab/backend/application/tag'
import {
  SeedAntDesignApiService,
  SeedAntDesignFieldsService,
  SeedSystemTypeService,
} from '@codelab/backend/application/type'

export class SeedDataService extends IUseCase<IUserRef, void> {
  async _execute(owner: IUserRef) {
    await new SeedSystemTypeService().execute(owner)

    await new SeedAntDesignApiService().execute(owner)

    await new SeedTagsService().execute(owner)

    await new SeedAtomsService().execute(owner)

    await (await SeedAntDesignFieldsService.init(owner)).execute()
  }
}
