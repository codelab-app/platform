import type {
  IGraphqlHookConfig,
  IQueryConfigHookConfig,
  IQueryLambdaHookConfig,
  IRecoilStateHookConfig,
  IRouterHookConfig,
} from '@codelab/frontend/abstract/core'

export interface LambdaDescriptionProps {
  config: IQueryLambdaHookConfig
}

export interface QueryConfigDescriptionProps {
  config: IQueryConfigHookConfig
}

export interface GraphqlDescriptionProps {
  config: IGraphqlHookConfig
}

export interface RecoilStateDescriptionProps {
  config: IRecoilStateHookConfig
}

export interface RouterDescriptionProps {
  config: IRouterHookConfig
}
