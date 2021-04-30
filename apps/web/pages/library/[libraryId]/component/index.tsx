import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ComponentContext } from '@codelab/frontend/shared'
import React, { useContext } from 'react'
import { Empty } from 'antd'
import { ComponentRenderer } from '@codelab/modules/component'

const ComponentDetail = () => {
  const { component } = useContext(ComponentContext)

  if (!component) {
    return <Empty />
  }

  return (
    <div id="Builder" style={{ position: 'relative' }}>
      <h1>Component: {component?.label}</h1>
      <ComponentRenderer component={component} />
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()

export default ComponentDetail
