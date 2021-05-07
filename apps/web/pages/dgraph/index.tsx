import { useDgraph } from '@codelab/frontend/dgraph'
import React from 'react'

const query = `query all($a: string) {
  all(func: eq(name, $a))
  {
    name
  }
}`

const Dgraph = () => {
  const { client } = useDgraph()

  return (
    <>
      <h1>Welcome to Dgraph</h1>
    </>
  )
}

export default Dgraph
