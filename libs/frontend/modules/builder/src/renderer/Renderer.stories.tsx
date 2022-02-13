import { ElementTree } from '@codelab/shared/core'
import React from 'react'
import { demoGraphData } from '../../.storybook/demoGraphData'
import { Renderer } from './Renderer'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Renderer',
  // component: () => null,
}

const tree = new ElementTree(demoGraphData)

export const Builder = () => <Renderer tree={tree} typesById={{}} />
