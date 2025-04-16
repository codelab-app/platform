import type {
  IActionDto,
  IAppDto,
  IAtomDto,
  IAuthGuardDto,
  IComponentDto,
  IDomainDto,
  IElementDto,
  IFieldDto,
  IPageDto,
  IPropDto,
  IRedirectDto,
  IResourceDto,
  IStoreDto,
  ITagDto,
  ITypeDto,
} from '@codelab/shared-abstract-core'

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
  actionsDto?: Array<IActionDto>
  appsDto?: Array<IAppDto>
  atomsDto?: Array<IAtomDto>
  authGuardsDto?: Array<IAuthGuardDto>
  componentsDto?: Array<IComponentDto>
  domainsDto?: Array<IDomainDto>
  elementsDto?: Array<IElementDto>
  fieldsDto?: Array<IFieldDto>
  pagesDto?: Array<IPageDto>
  propsDto?: Array<IPropDto>
  redirectsDto?: Array<IRedirectDto>
  resourcesDto?: Array<IResourceDto>
  storesDto?: Array<IStoreDto>
  tagsDto?: Array<ITagDto>
  typesDto?: Array<ITypeDto>
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
  redirects: Array<IRedirectModel>
  resources: Array<IResourceModel>
  stores: Array<IStoreModel>
  types: Array<ITypeModel>
}
