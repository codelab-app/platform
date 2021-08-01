import React from 'react'
import { useQuery } from 'react-query'

export interface QueryProps {
  name: string
  fetchCallback: any
  children: React.ReactElement
}

export type QueryData = Array<any>

/**
 * Custom component for Codelab.ai
 * @returns
 */
export const Query = ({ name, fetchCallback, children }: QueryProps) => {
  const { isLoading, isError, data, error } = useQuery<QueryData>(
    name,
    fetchCallback,
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {(error as any)?.message}</span>
  }

  console.log(isLoading, data)

  if (!data) {
    return <></>
  }

  return data?.map((x) => <>{React.cloneElement(children)}</>)
}
