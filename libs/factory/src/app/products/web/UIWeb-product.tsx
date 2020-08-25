/* eslint-disable react/no-this-in-sfc */
import React, { ComponentType } from 'react'
import { evalPropsWithContext } from '@codelab/props'
import { UIProduct } from '../App-product.i'

export class UIWebProduct extends UIProduct {
  // Called by builder
  build() {
    // this.root = makeTree(this.factory.order)
    console.log('build product')
  }

  render(): ComponentType {
    return () => {
      return <this.root.Component {...evalPropsWithContext(this.root.props)} />
    }
  }
}
