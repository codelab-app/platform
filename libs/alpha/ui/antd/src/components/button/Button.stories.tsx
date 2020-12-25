/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react'
import { queryGraph } from '../../apolloLoader'
import { buttonData, buttonEvalData } from './Button.data'
import { IGraphData, Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Button',
  parameters: {
    data: {
      Default: buttonData,
      EvalButton: buttonEvalData,
    },
  },
}

export const Default = () => {
  const Button = Renderer.components(buttonData)

  return <Button />
}

export const EvalButton = () => {
  const Button = Renderer.components(buttonEvalData)

  return <Button />
}

export interface IGraphStroyArgs<T = IGraphData> {
  fetched: boolean | undefined
  data: T | undefined
}

export const GraphButton = (args: IGraphStroyArgs) => {
  if (args.fetched) {
    const GraphButton = Renderer.graphComponents(args.data as IGraphData)

    return <GraphButton />
  }

  return <div>loading...</div>
}

GraphButton.parameters = {
  graphLabel: 'button-graph',
}

export const GraphButtonWithLoaders = (args: any, ctx: any) => {
  const data = ctx?.loaded?.data

  const GraphButton = Renderer.graphComponents(data as IGraphData)

  return <GraphButton />
}

GraphButtonWithLoaders.loaders = [
  async () => {
    const graphLabel = 'button-graph'

    return queryGraph(graphLabel)
  },
]
