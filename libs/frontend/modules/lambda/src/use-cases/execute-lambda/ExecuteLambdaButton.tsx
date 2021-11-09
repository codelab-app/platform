import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import React from 'react'
import { LambdaRecord } from '../get-lambdas/LambdaRecord'
import { useExecuteLambdaMutation } from '../lambda.endpoints'

export const ExecuteLambdaButton = (props: LambdaRecord) => {
  const [executeLambdaMutation, { isLoading }] = useExecuteLambdaMutation()

  return (
    <Button
      type="primary"
      onClick={() => {
        return executeLambdaMutation({
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
        }).then(({ data }: any) => {
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
