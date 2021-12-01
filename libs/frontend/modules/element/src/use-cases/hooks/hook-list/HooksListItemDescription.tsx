import { AtomType } from '@codelab/shared/abstract/core'
import React from 'react'
import {
  GraphqlDescription,
  QueryConfigDescription,
  QueryLambdaDescription,
  RecoilStateDescription,
} from './hook-description'
import { HooksListItemDescriptionProps } from './types'

export const HooksListItemDescription = ({
  hook,
}: HooksListItemDescriptionProps) => {
  const { config, type } = hook
  const configJson = JSON.parse(config.data)

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
    default:
      return null
  }
}
