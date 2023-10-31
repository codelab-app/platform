import type { IAppDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import chance from './chance'

export default Factory.define<IAppDTO>(({ params }) => {
  const dto: IAppDTO = {
    domains: params.domains,
    id: params.id ?? v4(),
    name: params.name ?? chance.word({ capitalize: true }),
    owner: { id: params.owner?.id ?? v4() },
    pages: params.pages,
  }

  return dto
})
