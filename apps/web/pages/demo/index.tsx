import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

const mapper = (mod: any) => mod.UserOutlined
const Icon = dynamic(() => import('@ant-design/icons').then(mapper) as any)

// const MyButton = dynamic(() => import('antd/lib/button'))

const Counter = (props: any) => {
  console.log('Counter')

  return <span>{props.counter}</span>
}

Counter.displayName = 'Counter'

const Demo = () => {
  const [, state] = useStatefulExecutor(
    () => {
      return Promise.resolve({})
    },
    {
      executeOnMount: true,
    },
  )

  const [counter, setCounter] = useState(0)

  return (
    <>
      <Icon />
      <Button onClick={() => setCounter(counter + 1)}>Click</Button>
      <Counter counter={counter} />
    </>
  )
}

export default Demo
