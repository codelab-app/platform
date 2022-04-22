import { AtomType, IHook } from '@codelab/shared/abstract/core'
import React from 'react'
import {
  GraphqlDescription,
  QueryConfigDescription,
  QueryLambdaDescription,
  RecoilStateDescription,
  RouterDescription,
} from './hook-description'

export type HooksListItemDescriptionProps = { hook: IHook }

export const HooksListItemDescription = ({
  hook,
}: HooksListItemDescriptionProps) => {
  const { config, type } = hook
  const configJson = JSON.parse(config.data as unknown as string)

  switch (type) {
    case AtomType.HookQueryLambda:
      return <QueryLambdaDescription config={configJson} />
    case AtomType.HookQueryConfig:
      return <QueryConfigDescription config={configJson} />
    case AtomType.HookGraphqlMutation:
    case AtomType.HookGraphqlQuery:
      return <GraphqlDescription config={configJson} />
    case AtomType.HookRecoilState:
      return <RecoilStateDescription config={configJson} />
    case AtomType.HookRouter:
      return <RouterDescription config={configJson} />
    default:
      return null
  }
}
