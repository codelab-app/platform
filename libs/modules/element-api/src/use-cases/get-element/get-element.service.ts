import {
  DgraphElement,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphRepository,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../element.validator'
import { GetElementRequest } from './get-element.request'

@Injectable()
export class GetElementService extends DgraphUseCase<
  GetElementRequest,
  DgraphElement
> {
  constructor(
    protected readonly dgraph: DgraphRepository,
    private elementGuardService: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetElementRequest,
    txn: Txn,
  ): Promise<DgraphElement> {
    await this.validate(request)

    return this.dgraph.getOneOrThrow(
      txn,
      this.createQuery(request),
      () => new Error('Element not found'),
    )
  }

  protected async validate({
    currentUser,
    input: { elementId },
  }: GetElementRequest): Promise<void> {
    await this.elementGuardService.existsAndIsOwnedBy(elementId, currentUser)
  }

  private createQuery({ input: { elementId } }: GetElementRequest) {
    return new DgraphQueryBuilder()
      .setUidFunc(elementId)
      .addTypeFilterDirective(DgraphEntityType.Element)
      .addBaseFields()
      .addRecurseDirective().addFields(`
          name
          children @facets(order)
          component
          atom
          value
          elementProps
          props
          values
          booleanValue
          floatValue
          intValue
          stringValue
          type
          key
          css
          description
          fields
          field
          allowedValues
          itemType
          primitiveKind
          atomType
          api
      `)
  }
}
