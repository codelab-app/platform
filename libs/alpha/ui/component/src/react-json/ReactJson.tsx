import React from 'react'
import Highlight from 'react-highlight'

interface ReactJsonProps {
  data: object
}

export const ReactJson = ({ data }: ReactJsonProps) => {
  return <Highlight className="json">{JSON.stringify(data, null, 2)}</Highlight>
}
