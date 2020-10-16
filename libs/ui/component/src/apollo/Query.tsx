import { Spin } from 'antd'
import { DocumentNode } from 'graphql'
import React from 'react'
import { RenderProps } from '../node'

interface QueryProps {
  // useQuery: (options: QueryHookOptions) => ReturnType<typeof useApolloQuery>
  useQuery: any
  gql: DocumentNode
}

type QueryResult = {
  data: any
}

export const Query = (props: RenderProps<QueryProps, QueryResult>) => {
  const { children, useQuery, gql } = props
  const { loading, error, data } = useQuery({ query: gql })

  if (loading) return <Spin />

  return <>{children({ data })}</>
}
