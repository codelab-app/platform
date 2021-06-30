import { DgraphArrayMapper, UseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Prop, PropAggregate, PropAggregateMapper } from '../../models'
import { GetPropsInput, GetPropsService } from '../get-props'

@Injectable()
export class GetPropAggregatesService
  implements UseCase<GetPropsInput, Array<PropAggregate>>
{
  private propAggregateArrayMapper: DgraphArrayMapper<Prop, PropAggregate>

  constructor(
    private getPropsService: GetPropsService,
    private propAggregateMapper: PropAggregateMapper,
  ) {
    this.propAggregateArrayMapper = new DgraphArrayMapper(propAggregateMapper)
  }

  async execute(request: GetPropsInput): Promise<Array<PropAggregate>> {
    const props = await this.getPropsService.execute(request)

    return await this.propAggregateArrayMapper.map(props)
  }
}
