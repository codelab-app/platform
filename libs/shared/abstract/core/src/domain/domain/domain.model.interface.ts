import {
  VercelDomainConfigData,
  VercelProjectDomainData,
  // VercelProjectDomainData,
} from '@codelab/shared/abstract/codegen'
import { IEntity } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { IApp } from '../app'
import { IElementTreeService } from '../element'
import { IPage } from '../page'

export interface IDomain {
  id: IDomainRef
  name: string
  app: IApp
  domainConfig: VercelDomainConfigData
  projectDomainData: VercelProjectDomainData
}

export type IDomainRef = string
