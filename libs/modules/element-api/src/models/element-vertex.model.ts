import { createUnionType } from '@nestjs/graphql'
import { Component } from '../component'
import { Element } from './element.model'

export const ElementVertex = createUnionType({
  name: 'ElementVertex',
  types: () => [Element, Component],
})

export type ElementVertex = typeof ElementVertex
