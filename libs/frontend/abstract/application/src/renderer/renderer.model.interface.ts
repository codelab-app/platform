import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend-abstract-domain'
import type { Nullable } from '@codelab/shared-abstract-types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { ErrorBoundaryProps } from 'react-error-boundary'

import type { IRenderOutput, IRenderPipe } from './render.interface'
import type { IRuntimeComponentModel } from './runtime-component'
import type { IRuntimeElementModel } from './runtime-element'
import type { IRuntimePageModel } from './runtime-page'
import type { ITypedPropTransformer } from './typed-prop-transformer.interface'

export const enum RendererType {
  ComponentBuilder = 'component-builder',
  PageBuilder = 'page-builder',
  Preview = 'preview',
  Production = 'production',
}

export interface IRendererModel {
  containerNode: Ref<IComponentModel> | Ref<IPageModel>
  debugMode: boolean
  id: string
  isBuilder: boolean
  renderPipe: IRenderPipe
  rendered: Nullable<ReactElement<unknown>>
  rendererType: RendererType
  runtimeComponent?: IRuntimeComponentModel
  runtimeContainerNode: IRuntimeComponentModel | IRuntimePageModel
  runtimePage?: IRuntimePageModel
  runtimeRootContainerNode: Ref<IRuntimeComponentModel> | Ref<IRuntimePageModel>
  typedPropTransformers: ObjectMap<ITypedPropTransformer>
  render(): void
}

export interface ElementWrapperProps {
  errorBoundary: Omit<ErrorBoundaryProps, 'fallbackRender'>
  key: string
  /**
   * Props passed in from outside the component
   */
  renderOutput: IRenderOutput
  renderer: IRendererModel
  runtimeElement: IRuntimeElementModel
  onRendered(): void
}
