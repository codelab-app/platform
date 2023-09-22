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
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IComponentDTO } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

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
            props: connectNodeId(props.id),
            rootElement: connectNodeId(rootElement.id),
            store: connectNodeId(store.id),
          }),
        ),
      })
    ).components
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

  protected async _update(
    {
      api,
      childrenContainerElement,
      id,
      keyGenerator,
      name,
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
          props: connectNodeId(props.id),
          rootElement: connectNodeId(rootElement.id),
          store: connectNodeId(store.id),
        },
        where,
      })
    ).components[0]
  }
}
