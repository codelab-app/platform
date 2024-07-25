'use server'

import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { componentApi } from './component.api'

export const createComponentRepository = async (component: IComponentModel) =>
  await componentApi.CreateComponents({ input: component.toCreateInput() })
