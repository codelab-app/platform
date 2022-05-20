import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Button, Tabs } from 'antd'
import React, { useCallback, useState } from 'react'

const { TabPane } = Tabs

const useDemo = () => {
  console.log('useDemo')

  const sayHello = useCallback(() => {
    console.log('hello')
  }, [])

  return {}
}

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
