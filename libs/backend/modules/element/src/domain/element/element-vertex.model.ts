import { createUnionType } from '@nestjs/graphql'
import { Component } from '../component/component.model'
import { Element } from './element.model'

export const ElementVertex = createUnionType({
  name: 'ElementVertex',
  types: () => [Element, Component],
})

export type ElementVertex = typeof ElementVertex
