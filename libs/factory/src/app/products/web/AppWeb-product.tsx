/* eslint-disable react/no-this-in-sfc */
import React, { ComponentType } from 'react'
import { evalPropsWithContext } from '@codelab/core/props'
import { AppProduct } from '../App-product.i'

export class AppWebProduct extends AppProduct {
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
