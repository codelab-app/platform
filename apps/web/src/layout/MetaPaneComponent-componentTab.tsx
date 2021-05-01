import { useComponentBuilder } from '@codelab/frontend/builder'
import React from 'react'

export const ComponentTab = () => {
  const { selectedComponent, setSelected } = useComponentBuilder()

  console.log(selectedComponent)

  return <>{/* <h2>{component?.label}</h2> */}</>
}
