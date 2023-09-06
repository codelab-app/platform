import type {
  Component,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/backend/abstract/codegen'
import {
  componentSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IComponentDTO } from '@codelab/shared/abstract/core'
import { connectAuth0Owner, connectNodeId } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'
import { ValidationService } from 'backend/infra/adapter/typebox'

@Injectable()
export class ComponentRepository extends AbstractRepository<
  IComponentDTO,
  Component,
  ComponentWhere,
  ComponentOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
  ) {
    super(traceService, validationService)
  }

  protected async _find({
    options,
    where,
  }: {
    where?: ComponentWhere
    options?: ComponentOptions
  }) {
    return await (
      await this.ogmService.Component
    ).find({
      options,
      selectionSet: componentSelectionSet,
      where,
    })
  }

  async _add(components: Array<IComponentDTO>) {
    return (
      await (
        await this.ogmService.Component
      ).create({
        input: components.map(
          ({
            api,
            childrenContainerElement,
            id,
            keyGenerator,
            name,
            owner,
            props,
            rootElement,
            store,
          }) => ({
            api: connectNodeId(api.id),
            childrenContainerElement: connectNodeId(
              childrenContainerElement.id,
            ),
            id,
            keyGenerator,
            name,
            owner: connectAuth0Owner(owner),
            props: connectNodeId(props.id),
            rootElement: connectNodeId(rootElement.id),
            store: connectNodeId(store.id),
          }),
        ),
      })
    ).components
  }

  async _update(
    {
      api,
      childrenContainerElement,
      id,
      keyGenerator,
      name,
      owner,
      props,
      rootElement,
      store,
    }: IComponentDTO,
    where: ComponentWhere,
  ) {
    return (
      await (
        await this.ogmService.Component
      ).update({
        update: {
          api: connectNodeId(api.id),
          childrenContainerElement: connectNodeId(childrenContainerElement.id),
          id,
          keyGenerator,
          name,
          owner: connectAuth0Owner(owner),
          props: connectNodeId(props.id),
          rootElement: connectNodeId(rootElement.id),
          store: connectNodeId(store.id),
        },
        where,
      })
    ).components[0]
  }
}
