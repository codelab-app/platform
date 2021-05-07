import { useContext } from 'react'
import { DgraphContext } from './DgraphProvider'

export const useDgraph = () => {
  const { client } = useContext(DgraphContext)

  return {
    client,
  }
}
