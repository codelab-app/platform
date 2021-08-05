import { useExecuteLambdaMutation } from '@codelab/codegen/graphql'
import { Empty, Spin } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'

export interface QueryProps {
  name: string
  lambdaId: string
  children: React.ReactElement
}

export type QueryData = Array<any>

/**
 * Custom component for Codelab.ai
 * @returns
 */
export const Query = ({ name, lambdaId, children }: QueryProps) => {
  const [executeLambdaMutation] = useExecuteLambdaMutation()

  const { isLoading, isError, data, error } = useQuery<QueryData>(
    name,
    (context) => {
      if (!lambdaId) {
        return Promise.resolve({})
      }

      return executeLambdaMutation({
        variables: {
          input: {
            lambdaId,
            payload: JSON.stringify(context),
          },
        },
      })
        .then((r) => r.data?.executeLambda?.payload)
        .then((p) => {
          if (!p) {
            return {}
          }

          try {
            return JSON.parse(p)
          } catch (e) {
            console.error(e)

            return {}
          }
        })
    },
  )

  console.log(data)

  if (isLoading) {
    return <Spin />
  }

  if (isError) {
    return <span>Error: {(error as any)?.message}</span>
  }

  if (!data) {
    return <Empty />
  }

  return (
    <>
      {React.Children.map(children, (child) =>
        child
          ? React.cloneElement(child, {
              dataSource: data,
            })
          : null,
      )}
    </>
  )
}
