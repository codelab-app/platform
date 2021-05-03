import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ComponentContext } from '@codelab/frontend/shared'
import { ComponentRenderer } from '@codelab/modules/component'
import { Empty } from 'antd'
import React, { useContext } from 'react'

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
