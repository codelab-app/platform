import React, { ComponentType } from 'react'

import { UIProduct } from './UI-product.interface'

export class UIWebProduct extends UIProduct {
  Component: ComponentType

  build() {
    this.Component = () => <div>hi</div>
  }
}
