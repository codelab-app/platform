import type { ResourceWhere } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { IResource } from './resource.model.interface'

export type IResourceRepository = IRepository<IResource, IEntity, ResourceWhere>
