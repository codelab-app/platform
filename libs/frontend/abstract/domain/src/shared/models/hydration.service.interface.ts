import type {
  IAppDto,
  IComponentDto,
  IPageDto,
  IRef,
} from '@codelab/shared/abstract/core'
import type {
  AtomBuilderFragment,
  AuthGuardFragment,
  ComponentBuilderFragment,
  ElementFragment,
  FieldFragment,
  PropFragment,
  RedirectFragment,
  ResourceFragment,
  StoreFragment,
  TypeFragment,
} from '@codelab/shared/infra/gql'

import type { IActionModel } from '../../action'
import type { IAppModel } from '../../app'
import type { IAtomModel } from '../../atom'
import type { IAuthGuardModel } from '../../auth-guard'
import type { IComponentModel } from '../../component'
import type { IDomainModel } from '../../domain'
import type { IElementModel } from '../../element'
import type { IFieldModel } from '../../field'
import type { IPageModel } from '../../page'
import type { IRedirectModel } from '../../redirect'
import type { IResourceModel } from '../../resource'
import type { IStoreModel } from '../../store'
import type { ITypeModel } from '../../type'

export interface IHydrateable<Dto, Model> {
  hydrate(dto: Dto): Model
}

export interface IDomainStoreDto {
  actionsDto?: StoreFragment['actions']
  appsDto?: Array<IAppDto>
  atomsDto?: Array<AtomBuilderFragment>
  authGuardsDto?: Array<AuthGuardFragment>
  componentsDto?: Array<ComponentBuilderFragment | IComponentDto>
  elementsDto?: Array<
    ElementFragment & { closestContainerNode: { id: string } }
  >
  fieldsDto?: Array<FieldFragment>
  // pages?: Array<PageDevelopmentFragment>
  pagesDto?: Array<IPageDto>
  propsDto?: Array<PropFragment>
  redirectsDto?: Array<RedirectFragment>
  resourcesDto?: Array<ResourceFragment>
  storesDto?: Array<StoreFragment & { component?: IRef; page?: IRef }>
  typesDto?: Array<TypeFragment>
}

export interface IDomainStoreModel {
  actions: Array<IActionModel>
  apps: Array<IAppModel>
  atoms: Array<IAtomModel>
  authGuards: Array<IAuthGuardModel>
  component?: IComponentModel
  components: Array<IComponentModel>
  domains: Array<IDomainModel>
  elements: Array<IElementModel>
  fields: Array<IFieldModel>
  pages: Array<IPageModel>

  // props: Array<IPropModel>
  redirects: Array<IRedirectModel>
  resources: Array<IResourceModel>
  stores: Array<IStoreModel>
  types: Array<ITypeModel>
}
