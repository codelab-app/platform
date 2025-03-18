import type { ValidatedUrlParamsProps } from '@codelab/frontend/abstract/types'

export type ComponentContextParams = Pick<
  ValidatedUrlParamsProps,
  'componentId'
>

export interface IComponentBuilderRouteContext {
  params: ComponentContextParams
  type: IRouteType.Component
}
