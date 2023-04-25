import type {
  AntdTag,
  HtmlTag,
  ReactTag,
  TagNode,
} from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { SeedAtomsService } from '@codelab/backend/application/atom'
import { SeedTagsService } from '@codelab/backend/application/tag'
import {
  SeedAntDesignApiService,
  SeedAntDesignFieldsService,
  SeedHtmlTypeService,
  SeedSystemTypeService,
} from '@codelab/backend/application/type'
import { allTagTree } from '@codelab/backend/infra/data/seed'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'

interface ISeedDataProps {
  tagTreeData: TagNode
}

export class SeedDataService extends IUseCase<IAuth0Owner, void> {
  constructor(private readonly props: ISeedDataProps) {
    super()
  }

  async _execute(owner: IAuth0Owner) {
    await new SeedSystemTypeService().execute(owner)

    // await new SeedAntDesignApiService().execute(owner)

    await new SeedTagsService(owner).execute(allTagTree)

    // await new SeedAtomsService().execute(owner)

    await new SeedHtmlTypeService().execute(owner)

    // await (await SeedAntDesignFieldsService.init(owner)).execute()
  }
}
