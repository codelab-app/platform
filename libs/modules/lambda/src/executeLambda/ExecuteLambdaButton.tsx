import { Button } from 'antd'
import React from 'react'
import { LambdaRecord } from '../getLambdas/LambdaRecord'
import { useExecuteLambdaMutation } from '@codelab/generated'

export const ExecuteLambdaButton = (props: LambdaRecord) => {
  const [mutate] = useExecuteLambdaMutation({
    variables: {
      input: {
        lambdaId: props.id,
      },
    },
  })

  return (
    <Button
      type="primary"
      onClick={() => {
        mutate().then(({ data }) => {
          if (data) {
            console.log(data.executeLambda)
          }
        })
      }}
    >
      Execute
    </Button>
  )
}
