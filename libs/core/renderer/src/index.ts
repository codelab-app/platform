/* eslint-disable import/no-cycle */
import { TreeDom } from './TreeDom'
import { elementParameterFactory } from './ElementFactory'
import {
  Factory,
  FactoryComponent,
  ComponentProps,
  RenderComponent,
} from './component.interface'
import { ElementParameters } from './element-factory.interface'

export type {
  Factory,
  FactoryComponent,
  ComponentProps,
  RenderComponent,
  ElementParameters,
}

export { elementParameterFactory, TreeDom }
