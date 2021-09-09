import { Renderer } from '@codelab/frontend/modules/builder'
import {
  ElementGraphGraphql,
  ElementTreeGraphql,
} from '@codelab/frontend/modules/element'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const DemoRenderer = () => {
  const [mockData, setData] = useState({} as ElementGraphGraphql)
  useEffect(() => {
    fetchMockEndPoint()
      .then((response) => {
        console.log('data------', response.data)
        setData(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  if (!Object.keys(mockData).length) {
    return null
  }

  const tree = new ElementTreeGraphql(mockData)
  console.log('----------', tree)

  return <Renderer tree={tree} />
}

const fetchMockEndPoint = () => axios.post('/mock-endpoint')
