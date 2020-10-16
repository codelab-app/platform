import { useQuery } from '@apollo/client'
import { Spin } from 'antd'
import { DocumentNode } from 'graphql'
import React from 'react'
import { RenderProps } from '../node'

type QueryResult = {
  data: any
}

interface QueryProps {
  gql: DocumentNode
}

export const Query = (props: RenderProps<QueryProps, QueryResult>) => {
  const { children, gql } = props
  const { loading, error, data } = useQuery(gql)

  if (loading) return <Spin />

  return <>{children({ data })}</>
}
