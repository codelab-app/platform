import type {
  IGraphqlHookConfig,
  IQueryConfigHookConfig,
  IQueryLambdaHookConfig,
  IRouterHookConfig,
} from '@codelab/frontend-abstract-domain'

export interface LambdaDescriptionProps {
  config: IQueryLambdaHookConfig
}

export interface QueryConfigDescriptionProps {
  config: IQueryConfigHookConfig
}

export interface GraphqlDescriptionProps {
  config: IGraphqlHookConfig
}

export interface RouterDescriptionProps {
  config: IRouterHookConfig
}
