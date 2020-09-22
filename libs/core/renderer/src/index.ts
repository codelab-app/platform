/* eslint-disable import/no-cycle */
import {
  ComponentProps,
  Factory,
  FactoryComponent,
  RenderComponent,
} from './component.interface'
import { elementParameterFactory } from './element-factory'
import { Renderer } from './renderer'

export type { Factory, FactoryComponent, ComponentProps, RenderComponent }

export { elementParameterFactory, Renderer }
