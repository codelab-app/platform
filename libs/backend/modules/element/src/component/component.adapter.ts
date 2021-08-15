import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphComponent } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Component } from './component.model'

@Injectable()
export class ComponentAdapter extends BaseAdapter<DgraphComponent, Component> {
  mapSingle(input: DgraphComponent) {
    return new Component(input.uid, input.name)
  }
}
