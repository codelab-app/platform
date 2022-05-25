/* eslint-disable padding-line-between-statements */
import dynamic from 'next/dynamic'
import React, { ComponentType, useEffect } from 'react'

const getIcon = async () => {
  const mod = (await import('@ant-design/icons').then((module) => {
    console.log(module)

    return module.UserOutlined
  })) as any

  console.log(mod)

  return dynamic(() => mod)
}

const Demo = () => {
  let Icon: ComponentType | null = null

  useEffect(() => {
    ;(async () => {
      Icon = await getIcon()
    })()
  }, [])

  return <>{Icon ? <Icon /> : null}</>
}

export default Demo
