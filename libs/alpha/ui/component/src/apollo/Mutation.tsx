import { useMutation } from '@apollo/client'
import { Spin } from 'antd'
import { DocumentNode } from 'graphql'
import React from 'react'
import { RenderProps } from '..'

type MutationResult = {
  data: object
  action: Function
}

interface MutationProps {
  variables: object
  gql: DocumentNode
}

export const Mutation = (props: RenderProps<MutationProps, MutationResult>) => {
  const { children, gql, variables } = props
  const [mutation, { data, loading }] = useMutation(gql)

  // Bind variable to mutation for later usage
  const action = () => {
    console.log('Firing mutation with', variables)
    mutation({ variables })
  }

  if (loading) return <Spin />

  return <>{children({ data, action })}</>
}
