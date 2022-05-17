import { Button } from 'antd'
import React, { useCallback, useState } from 'react'

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

const Demo = () => {
  console.log('Demo')

  const [counter, setCounter] = useState(0)

  return (
    <>
      <Button onClick={() => setCounter(counter + 1)}>Click</Button>
      <Counter counter={counter} />
    </>
  )
}

export default Demo
