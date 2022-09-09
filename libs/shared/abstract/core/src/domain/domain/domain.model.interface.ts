import {
  VercelDomainConfigData,
  VercelProjectDomainData,
  // VercelProjectDomainData,
} from '@codelab/shared/abstract/codegen'

export interface IDomain {
  id: IDomainRef
  name: string
  // app: IApp
  domainConfig: VercelDomainConfigData
  projectDomainData: VercelProjectDomainData
}

export type IDomainRef = string
