import type { IHook } from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import React from 'react'
import {
  GraphqlDescription,
  QueryConfigDescription,
  QueryLambdaDescription,
  RecoilStateDescription,
  RouterDescription,
} from './hook-description'

export interface HooksListItemDescriptionProps {
  hook: IHook
}

export const HooksListItemDescription = ({
  hook,
}: HooksListItemDescriptionProps) => {
  const { config, type } = hook
  const configJson = JSON.parse(config.data as unknown as string)

  switch (type) {
    case IAtomType.HookQueryLambda:
      return <QueryLambdaDescription config={configJson} />
    case IAtomType.HookQueryConfig:
      return <QueryConfigDescription config={configJson} />
    case IAtomType.HookGraphqlMutation:
    case IAtomType.HookGraphqlQuery:
      return <GraphqlDescription config={configJson} />
    case IAtomType.HookRecoilState:
      return <RecoilStateDescription config={configJson} />
    case IAtomType.HookRouter:
      return <RouterDescription config={configJson} />
    default:
      return null
  }
}
