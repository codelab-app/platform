import { Button } from 'antd'
import React from 'react'
import { LambdaRecord } from '../getLambdas/LambdaRecord'
import { useExecuteLambdaMutation } from '@codelab/hasura'

export const ExecuteLambdaButton = (props: LambdaRecord) => {
  const [mutate] = useExecuteLambdaMutation({
    variables: {
      lambda: props,
      payload: JSON.stringify({
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      }),
    },
  })

  return (
    <Button
      type="primary"
      onClick={() => {
        mutate().then(({ data }) => {
          if (data) {
            console.log(data.executeLambda?.payload)
          }
        })
      }}
    >
      Execute
    </Button>
  )
}
