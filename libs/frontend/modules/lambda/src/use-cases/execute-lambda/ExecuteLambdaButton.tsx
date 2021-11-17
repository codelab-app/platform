import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import React, { useEffect } from 'react'
import { LambdaFragment } from '../../graphql/Lambda.fragment.graphql.gen'
import { useExecuteLambdaMutation } from '../../store'

export const ExecuteLambdaButton = ({ id }: LambdaFragment) => {
  const [executeLambdaMutation, { data, isLoading }] =
    useExecuteLambdaMutation()

  useEffect(() => {
    if (!isLoading && data) {
      createNotificationHandler({
        type: 'info',
        title: 'Execute result',
        content: JSON.stringify(data.executeLambda?.payload),
      })()
    }
  }, [isLoading, data])

  const onClick = async () => {
    executeLambdaMutation({
      variables: {
        input: {
          lambdaId: id,
        },
      },
    })
  }

  return (
    <Button type="primary" loading={isLoading} onClick={onClick}>
      Execute
    </Button>
  )
}
