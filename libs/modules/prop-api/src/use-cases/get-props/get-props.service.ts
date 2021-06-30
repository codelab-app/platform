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
  PropsByIdsFilter,
  PropsByInterfaceValueId,
  PropsByPageElementFilter,
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
    { byPageElement, byInterfaceValue, byIds }: GetPropsInput,
    txn: Txn,
  ): Promise<Array<Prop>> {
    if (
      [byIds, byPageElement, byInterfaceValue].filter((f) => !!f).length > 1
    ) {
      throw new Error('Provide exactly 1 filter to getProps')
    }

    if (byPageElement) {
      if (
        !byPageElement.pageElementIds ||
        byPageElement.pageElementIds.length === 0
      ) {
        throw new Error('pageElementIds not provided')
      }

      return await this.getByPageElement(byPageElement, txn)
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

  private async getByPageElement(
    byPageElement: PropsByPageElementFilter,
    txn: Txn,
  ) {
    const queryBuilder = new GetPropsQueryBuilder()
      .withFields('PageElement.props')
      .withUidsFunc(byPageElement.pageElementIds)

    if (byPageElement.fieldId) {
      queryBuilder
        .getField(DgraphPropFields.field)
        ?.withFilters(new UidFilter(byPageElement.fieldId))
    }

    const query = queryBuilder.build()
    const response = await txn.query(query)

    const allPageElements = (response.getJson() as any).query as Array<
      GetPropsQueryResult & {
        'PageElement.props': Array<GetPropsQueryResult>
      }
    >

    if (!allPageElements || !allPageElements[0]) {
      throw new Error('Error while getting props')
    }

    const mapPageElementProps = async (data: {
      'PageElement.props': Array<GetPropsQueryResult>
    }): Promise<Array<Prop>> => {
      if (
        !data['PageElement.props'] ||
        data['PageElement.props'].length === 0
      ) {
        return []
      }

      let props = data['PageElement.props']

      if (byPageElement.fieldId) {
        props = props.filter((p) => !!p[DgraphPropFields.field])
      }

      return await this.propArrayMapper.map(props)
    }

    const results = await Promise.all(allPageElements.map(mapPageElementProps))

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
