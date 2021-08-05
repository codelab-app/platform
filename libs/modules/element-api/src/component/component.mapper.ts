import { DgraphComponent, Mapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Component } from './component.model'

@Injectable()
export class ComponentMapper implements Mapper<DgraphComponent, Component> {
  async map(input: DgraphComponent) {
    return new Component(input.uid, input.name)
  }
}
