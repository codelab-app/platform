import type {
  IUserDomainService,
  IUserModel,
} from '@codelab/frontend/abstract/domain'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { AxiosResponse } from 'axios'
import type { BuilderWidth, BuilderWidthBreakPoint } from '../builder'

interface IAppPreferences {
  selectedBuilderBreakpoint?: BuilderWidthBreakPoint
  selectedBuilderWidth?: BuilderWidth
}

export interface IUserPreference {
  apps: Record<string, Nullish<IAppPreferences>>
  explorerExpandedNodes: Record<string, Array<string>>
}
export interface IUserService {
  preferences: IUserPreference
  user: IUserModel
  userDomainService: IUserDomainService

  saveUser(data: Auth0IdToken): Promise<AxiosResponse>
  setElementTreeExpandedKeys(
    containerId: string,
    expandedKeys: Array<string>,
  ): void
  setSelectedBuilderBreakpoint(
    containerId: string,
    breakpoint: BuilderWidthBreakPoint,
  ): void
  setSelectedBuilderWidth(containerId: string, width: BuilderWidth): void
}
