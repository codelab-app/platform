import {
  IGraphqlHookConfig,
  IQueryConfigHookConfig,
  IQueryLambdaHookConfig,
  IRecoilStateHookConfig,
} from '@codelab/shared/abstract/core'

export type LambdaDescriptionProps = {
  config: IQueryLambdaHookConfig
}

export type QueryConfigDescriptionProps = {
  config: IQueryConfigHookConfig
}

export type GraphqlDescriptionProps = {
  config: IGraphqlHookConfig
}

export type RecoilStateDescriptionProps = {
  config: IRecoilStateHookConfig
}
