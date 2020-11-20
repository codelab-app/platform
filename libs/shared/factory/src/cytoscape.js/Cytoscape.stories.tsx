import cytoscape from 'cytoscape'
import React, { useEffect, useRef } from 'react'
import { input } from './demo-data'
import { cyMapEdges, cyMapVertices } from './mapper'

export default {
  title: 'Cytoscape',
}

export const Cytoscape = () => {
  const cyRef = useRef(null)

  useEffect(() => {
    const config = {
      container: cyRef.current,
      style: [
        {
          selector: 'node',
          style: { content: 'data(label)' },
        },
      ],
      elements: [...cyMapVertices(input.vertices), ...cyMapEdges(input.edges)],
    }

    cytoscape(config)
  }, [])

  return (
    <>
      <h1>Cytoscape</h1>
      <div ref={cyRef} style={{ width: '100%', height: 600 }} />
    </>
  )
}
