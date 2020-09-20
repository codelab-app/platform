import { ComponentType } from 'react'
import { AppFactory } from '../factories/App-factory.i'
import {
  TraversalIteratee,
  TraversalOrder,
} from '@codelab/shared/interface/graph'
import { NodeDtoA } from '@codelab/shared/interface/node'

/**
 * Product knows about a factory, is called by builder
 */
export abstract class AppProduct {
  abstract render(): ComponentType

  abstract build(): void

  protected factory: AppFactory

  protected traversal?: TraversalOrder

  protected iteratee?: TraversalIteratee

  protected root?: NodeDtoA

  constructor(factory: AppFactory) {
    this.factory = factory
  }
}
