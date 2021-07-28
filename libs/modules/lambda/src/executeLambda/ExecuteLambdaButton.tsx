import { useExecuteLambdaLazyQuery } from '@codelab/codegen/graphql'
import { Button } from 'antd'
import React from 'react'
import { LambdaRecord } from '../getLambdas/LambdaRecord'

export const ExecuteLambdaButton = (props: LambdaRecord) => {
  const [executeLambdaQuery, { data, loading }] = useExecuteLambdaLazyQuery({
    variables: {
      input: {
        lambdaId: props.id,
        // payload: JSON.stringify({
        //   key1: 'value1',
        //   key2: 'value2',
        //   key3: 'value3',
        // }),
      },
    },
  })

  return (
    <Button
      type="primary"
      onClick={() => {
        executeLambdaQuery()

        console.log(loading, data)
        // if (data) {
        //   createNotificationHandler({
        //     type: 'info',
        //     title: 'Execute result',
        //     content: JSON.stringify(data.executeLambda?.payload),
        //   })()
        //   console.log(data.executeLambda?.payload)
        // }
      }}
    >
      Execute
    </Button>
  )
}
