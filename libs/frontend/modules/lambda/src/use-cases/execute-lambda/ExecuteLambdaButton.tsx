import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import React from 'react'
import { LambdaRecord } from '../get-lambdas/LambdaRecord'
import { useExecuteLambdaMutation } from './ExecuteLambda.api.graphql.gen'

export const ExecuteLambdaButton = (props: LambdaRecord) => {
  const [executeLambdaMutation, { loading }] = useExecuteLambdaMutation({
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
        return executeLambdaMutation().then(({ data }) => {
          if (data) {
            createNotificationHandler({
              type: 'info',
              title: 'Execute result',
              content: JSON.stringify(data.executeLambda?.payload),
            })()
          }
        })
      }}
    >
      Execute
    </Button>
  )
}
