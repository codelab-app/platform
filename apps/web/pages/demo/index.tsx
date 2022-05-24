import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import React, { useState } from 'react'

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

  console.log(state)

  const [counter, setCounter] = useState(0)

  return (
    <>
      <Button onClick={() => setCounter(counter + 1)}>Click</Button>
      <Counter counter={counter} />
    </>
  )
}

export default Demo
