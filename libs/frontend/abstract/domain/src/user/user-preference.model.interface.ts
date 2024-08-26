import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { BuilderWidth, BuilderWidthBreakPoint } from '../builder'

export interface IBuilderPreferences {
  breakpoint?: BuilderWidthBreakPoint
  explorerExpandedNodes?: Array<string>
  width?: BuilderWidth
}

export interface IUserPreferenceModel {
  builder: ObjectMap<IBuilderPreferences>
  getBuilderPreference(compositeKey: string): Maybe<IBuilderPreferences>
  setBuilderPreference(
    compositeKey: string,
    preferences: Partial<IBuilderPreferences>,
  ): void
}
