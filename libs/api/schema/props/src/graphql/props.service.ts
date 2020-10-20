import { Injectable, Logger } from '@nestjs/common'
import { Prop } from './model/prop.model'

@Injectable()
export class PropsService {
  private props: Array<Prop> = [
    {
      id: 1,
      // props: { text: 'Button', size: 'medium', type: 'primary' },
      value: 'button',
    },
  ]

  findOneById(nodeId: number): Prop | undefined {
    Logger.log('findOneById')

    return this.props.find(({ id }) => id === nodeId)
  }
}
