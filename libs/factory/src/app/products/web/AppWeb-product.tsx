/* eslint-disable react/no-this-in-sfc */
import React, { ComponentType } from 'react'
import { AppProduct } from '../App-product.i'
import { evalPropsWithContext } from '@codelab/core/props'

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
