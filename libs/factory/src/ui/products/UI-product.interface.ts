import { ComponentType } from 'react'
import { UIFactory } from '../factories/UI-factory.interface'

/**
 * Product knows about a factory, is called by builder
 */
export abstract class UIProduct {
  abstract Component: ComponentType

  abstract build(): void

  public factory: UIFactory

  constructor(factory: UIFactory) {
    this.factory = factory
  }
}
