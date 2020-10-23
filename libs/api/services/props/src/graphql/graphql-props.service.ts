import { Injectable, Logger } from '@nestjs/common'
import { Prop } from './model'

@Injectable()
export class GraphqlPropsService {
  private props: Array<Prop> = [
    {
      id: 1,
      props: { text: 'Button', size: 'medium', type: 'primary' },
    },
  ]

  findOneById(nodeId: number): Prop | undefined {
    Logger.log('findOneById')

    return this.props.find(({ id }) => id === nodeId)
  }
}
