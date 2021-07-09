import {
  DgraphArrayMapper,
  DgraphProvider,
  DgraphTokens,
  DgraphUseCase,
  UidFilter,
} from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import * as _ from 'lodash'
import {
  DgraphInterfaceValueFields,
  DgraphProp,
  DgraphPropFields,
  Prop,
  PropAggregate,
  PropAggregateMapper,
  PropMapper,
} from '../../models'
import {
  GetPropsInput,
  PropsByElementFilter,
  PropsByIdsFilter,
  PropsByInterfaceValueId,
} from './get-props.input'
import { GetPropsQueryBuilder, GetPropsQueryResult } from './get-props.query'

@Injectable()
export class GetPropsService extends DgraphUseCase<GetPropsInput, Array<Prop>> {
  private propArrayMapper: DgraphArrayMapper<DgraphProp, Prop>

  private propAggregateArrayMapper: DgraphArrayMapper<Prop, PropAggregate>

  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    private propMapper: PropMapper,
    private propAggregateMapper: PropAggregateMapper,
  ) {
    super(dgraphProvider)
    this.propArrayMapper = new DgraphArrayMapper(propMapper)
    this.propAggregateArrayMapper = new DgraphArrayMapper(propAggregateMapper)
  }

  protected async executeTransaction(
    { byElement, byInterfaceValue, byIds }: GetPropsInput,
    txn: Txn,
  ): Promise<Array<Prop>> {
    if ([byIds, byElement, byInterfaceValue].filter((f) => !!f).length > 1) {
      throw new Error('Provide exactly 1 filter to getProps')
    }

    if (byElement) {
      if (!byElement.elementIds) {
        throw new Error('elementIds not provided')
      }

      if (byElement.elementIds.length === 0) {
        return []
      }

      return await this.getByElement(byElement, txn)
    }

    if (byIds) {
      return await this.getByIds(byIds, txn)
    }

    if (byInterfaceValue) {
      if (!byInterfaceValue.interfaceValueId) {
        throw new Error('interfaceValueId not provided')
      }

      return await this.getByInterfaceValue(byInterfaceValue, txn)
    }

    throw new Error('At least one filter must be provided to getProps')
  }

  private async getByElement(byElement: PropsByElementFilter, txn: Txn) {
    const queryBuilder = new GetPropsQueryBuilder()
      .withFields('Element.props')
      .withUidsFunc(byElement.elementIds)

    if (byElement.fieldId) {
      queryBuilder
        .getField(DgraphPropFields.field)
        ?.withFilters(new UidFilter(byElement.fieldId))
    }

    const query = queryBuilder.build()
    const response = await txn.query(query)

    const allElements = (response.getJson() as any).query as Array<
      GetPropsQueryResult & {
        'Element.props': Array<GetPropsQueryResult>
      }
    >

    if (!allElements || !allElements[0]) {
      throw new Error('Error while getting props')
    }

    const mapElementProps = async (data: {
      'Element.props': Array<GetPropsQueryResult>
    }): Promise<Array<Prop>> => {
      if (!data['Element.props'] || data['Element.props'].length === 0) {
        return []
      }

      let props = data['Element.props']

      if (byElement.fieldId) {
        props = props.filter((p) => !!p[DgraphPropFields.field])
      }

      return await this.propArrayMapper.map(props)
    }

    const results = await Promise.all(allElements.map(mapElementProps))

    return _.flatMap(results)
  }

  private async getByIds(byIds: PropsByIdsFilter, txn: Txn) {
    const query = new GetPropsQueryBuilder().withUidsFunc(byIds.propIds).build()
    const response = await txn.query(query)
    const data = (response.getJson() as any).query as Array<GetPropsQueryResult>

    return await this.propArrayMapper.map(data)
  }

  private async getByInterfaceValue(
    byInterfaceValue: PropsByInterfaceValueId,
    txn: Txn,
  ) {
    const query = new GetPropsQueryBuilder()
      .withUidFunc(byInterfaceValue.interfaceValueId)
      .build()

    const response = await txn.query(query)

    const data = (response.getJson() as any).query as Array<
      GetPropsQueryResult & {
        [DgraphInterfaceValueFields.props]: Array<GetPropsQueryResult>
      }
    >

    if (!data || !data[0]) {
      throw new Error('Error while getting props')
    }

    if (
      !data[0][DgraphInterfaceValueFields.props] ||
      data[0][DgraphInterfaceValueFields.props].length === 0
    ) {
      return []
    }

    return await this.propArrayMapper.map(
      data[0][DgraphInterfaceValueFields.props],
    )
  }
}
