import { ObjectFieldTemplateProps } from '@rjsf/core'
import React from 'react'

export const CodelabObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  console.log(props)

  return (
    <div>
      {props.title}
      {props.description}
      {props.properties.map((element) => (
        <div>{element.content}</div>
      ))}
    </div>
  )
}
