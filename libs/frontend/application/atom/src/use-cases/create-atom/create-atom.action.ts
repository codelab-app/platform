import { type ICreateAtomData } from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend/infra/mobx'
import { usePaginationService } from '@codelab/frontend-application-shared-store/pagination'
import {
  atomListRepository,
  createAtomRepository,
} from '@codelab/frontend-domain-atom/repositories'
import {
  IElementRenderTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const useCreateAtomAction = async ({
  externalCssSource,
  externalJsSource,
  externalSourceType,
  id,
  name,
  tags = [],
  type,
}: ICreateAtomData) => {
  const { atomDomainService, typeDomainService } = useDomainStore()

  const getDataFn = async (
    page: number,
    pageSize: number,
    filter: { name: string },
  ) => {
    const { aggregate, items } = await atomListRepository(
      { name_MATCHES: `(?i).*${filter.name}.*` },
      {
        limit: pageSize,
        offset: (page - 1) * pageSize,
      },
    )

    return { items, totalItems: aggregate.count }
  }

  const atomPaginationService = usePaginationService('atom', getDataFn)

  const api = typeDomainService.hydrateInterface({
    id: v4(),
    kind: ITypeKind.InterfaceType,
    name: `${name} API`,
  })

  const atom = atomDomainService.hydrate({
    __typename: IElementRenderTypeKind.Atom,
    api,
    externalCssSource,
    externalJsSource,
    externalSourceType,
    id,
    name,
    tags,
    type,
  })

  await createAtomRepository(atom)

  return atom
}
