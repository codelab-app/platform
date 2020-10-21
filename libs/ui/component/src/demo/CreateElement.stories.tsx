import { Button as AntButton } from 'antd'
import React from 'react'
import { Renderer } from '@codelab/core/renderer'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export default {
  title: 'Demo',
}

export const CreateElement = () => {
  const Button = React.createElement(AntButton, {}, 'Submit')

  const PrimaryButton = React.cloneElement(Button, { type: 'primary' })

  console.log(Button)

  return <>{PrimaryButton}</>
}

export const DoubleCloneChildren = () => {
  const A = React.createElement('div', {}, 'a')
  const B = React.createElement('div', {}, 'b')
  const C = React.createElement('div', {}, 'c')

  const Cloned = React.cloneElement(A, {}, B)

  return <>{Cloned}</>
}

export const RootChildren = () => {
  const data: NodeReactI = {
    type: NodeType.React_Html_Div,
    // children: [
    //   {
    //     type: 'React.Text',
    //     props: { value: 'Text' },
    //   },
    // ],
  }

  const Comp = Renderer.components(data)

  return (
    <Comp>
      <h1>hi</h1>
    </Comp>
  )
}

export const RootChildren2 = () => {
  const dataA: NodeReactI = {
    type: NodeType.React_Html_Div,
    props: {
      'data-testid': 'a',
    },
  }
  const dataB: NodeReactI = {
    type: NodeType.React_Html_Div,
    props: {
      'data-testid': 'b',
    },
  }

  const A = Renderer.components(dataA)
  const B = Renderer.components(dataB)

  return (
    <A>
      <B />
    </A>
  )
}
