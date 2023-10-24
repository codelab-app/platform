import type {
  IFactoryApplicationCallback,
  IRootStore,
} from '@codelab/frontend/abstract/application'
import type {
  IAppModel,
  IFactoryDomainCallback,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import {
  AtomModelFactory,
  AtomTestFactory,
} from '@codelab/frontend/domain/atom'
import { chance, ModelFactory } from '@codelab/frontend/domain/shared'
import { type IAppDTO, IAtomType } from '@codelab/shared/abstract/core'
import type { DeepPartial } from 'fishery'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const AppTestFactory = (rootStore: Partial<IRootDomainStore>) => {
  const atomFactory = AtomTestFactory(rootStore)
  const reactFragment = atomFactory.build({ name: IAtomType.ReactFragment })

  return Factory.define<IAppModel, IAppDTO>(
    ({ associations, transientParams }) => {
      const dto: IAppDTO = {
        domains: transientParams.domains,
        id: transientParams.id ?? v4(),
        name: transientParams.name ?? chance.word({ capitalize: true }),
        owner: { id: transientParams.owner?.id ?? v4() },
        pages: associations.pages,
      }

      const model = rootStore.appDomainService?.create(dto, reactFragment!)
      // const model = rootStore.appDomainService?.hydrate(dto)

      return model!
    },
  )
}

export const appFactory =
  (rootStore: IRootDomainStore) => (dto: DeepPartial<IAppDTO>) => {
    const app: IAppDTO = {
      domains: dto.domains ?? [],
      id: dto.id ?? v4(),
      name: dto.name ?? chance.word({ capitalize: true }),
      owner: { id: dto.owner?.id ?? v4() },
      pages: dto.pages ?? [],
    }

    return rootStore.appDomainService.create(app, reactFragment)
  }
