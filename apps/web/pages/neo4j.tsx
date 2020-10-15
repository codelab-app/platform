import { Button } from 'antd'
import * as cypher from 'cypher-query-builder'
import React from 'react'

const db = new cypher.Connection('bolt://localhost:7687', {
  username: 'neo4j',
  password: 'password',
})

const node = cypher.node('field', 'Field', {})

const runQuery = async () => {
  console.log('runQuery')

  const fields = await db.create(node).return(['field']).run()

  console.log(fields)
}

const deleteQuery = async () => {
  console.log('deleteQuery')

  const fields = await db.match(node).delete('field').return(['field']).run()

  console.log(fields)
}

export const Neo4j = () => {
  return (
    <>
      <Button onClick={() => deleteQuery()}>Delete</Button>
      <Button onClick={() => runQuery()}>Run</Button>
    </>
  )
}

export default Neo4j
