import { Injectable } from '@nestjs/common'
import { Prop } from './model/prop.model'

@Injectable()
export class PropsService {
  private props: Array<Prop> = [
    {
      id: 1,
      props: { text: 'Button', size: 'medium', type: 'primary' },
    },
  ]

  findOneById(nodeId: number): Prop | undefined {
    return this.props.find(({ id }) => id === nodeId)
  }
}
