/* eslint-disable import/no-cycle */
import { elementParameterFactory } from './ElementFactory'
import { TreeDom } from './TreeDom'
import {
  ComponentProps,
  Factory,
  FactoryComponent,
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
