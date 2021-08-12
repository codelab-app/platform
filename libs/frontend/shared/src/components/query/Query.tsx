import { useExecuteLambdaMutation } from '@codelab/codegen/graphql'
import { Empty, Spin } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'

export interface QueryProps {
  queryKey: string
  /** The id of the lambda that will execute the query */
  lambda: string
  children: React.ReactElement
}

export type QueryData = Array<any>

const useLambdaQuery = (queryKey: string, lambdaId: string) => {
  const [executeLambdaMutation] = useExecuteLambdaMutation()

  return useQuery<QueryData>(queryKey, async (context) => {
    if (!lambdaId) {
      return Promise.resolve({})
    }

    const r = await executeLambdaMutation({
      variables: {
        input: { lambdaId, payload: JSON.stringify(context) },
      },
    })

    const p = r.data?.executeLambda?.payload

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
}

/**
 * Custom component for Codelab.ai
 * @returns
 */
export const Query = ({ queryKey, lambda, children }: QueryProps) => {
  const { isLoading, isError, data, error } = useLambdaQuery(queryKey, lambda)

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
        child ? React.cloneElement(child, data) : null,
      )}
    </>
  )
}
