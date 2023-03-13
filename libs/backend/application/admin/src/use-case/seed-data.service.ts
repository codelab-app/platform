import { IUseCase } from '@codelab/backend/abstract/types'
import { SeedAtomsService } from '@codelab/backend/application/atom'
import { SeedTagsService } from '@codelab/backend/application/tag'
import {
  SeedAntDesignApiService,
  SeedAntDesignFieldsService,
  SeedSystemTypeService,
} from '@codelab/backend/application/type'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'

export class SeedDataService extends IUseCase<IAuth0Owner, void> {
  async _execute(owner: IAuth0Owner) {
    await new SeedSystemTypeService().execute(owner)

    await new SeedAntDesignApiService().execute(owner)

    await new SeedTagsService().execute(owner)

    await new SeedAtomsService().execute(owner)

    await (await SeedAntDesignFieldsService.init(owner)).execute()
  }
}
