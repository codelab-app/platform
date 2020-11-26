/* eslint-disable no-shadow*/
import React from 'react'
import { buttonData, buttonEvalData } from './Button.data'
import { IGraphData, Renderer } from '@codelab/core/renderer'

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
  fetched: boolean | undefined,
  data: T | undefined
}

export const GraphButton = (args: IGraphStroyArgs) => {
  if (args.fetched) {
    const GraphButton = Renderer.graphComponents(args.data as IGraphData);
    return <GraphButton />
  } else {

    return <div>loading...</div>
  }
}


GraphButton.parameters = {
  graphLabel: 'button-graph',
}
