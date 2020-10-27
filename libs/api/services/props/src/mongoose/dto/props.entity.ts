import { NodeType } from '@codelab/api/services/node'

export class PropsEntity {
  declare id: string

  declare values: object

  declare type: NodeType

  constructor(partial: Partial<PropsEntity> | any) {
    console.log(partial)

    const { __v, _id, ...fields } = partial

    Object.assign(this, {
      id: _id,
      ...fields,
    })
  }
}
