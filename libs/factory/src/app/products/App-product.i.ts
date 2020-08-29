import {
  NodeInterface,
  TraversalIteratee,
  TraversalOrder,
} from '@codelab/graph'
import { ComponentType } from 'react'
import { AppFactory } from '../factories/App-factory.i'

/**
 * Product knows about a factory, is called by builder
 */
export abstract class AppProduct {
  abstract render(): ComponentType

  abstract build(): void

  protected factory: AppFactory

  protected traversal: TraversalOrder

  protected iteratee: TraversalIteratee

  protected root: NodeInterface

  constructor(factory: AppFactory) {
    this.factory = factory
  }
}
