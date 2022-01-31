import { DgraphEntityType } from '@codelab/backend/abstract/core'
import {
  BaseMutationFactory,
  mergeMutations,
  NullablePredicates,
  randomBlankNode,
} from '@codelab/backend/infra'
import { PropMutationFactory } from '@codelab/backend/modules/prop'
import { IHook } from '@codelab/shared/abstract/core'
import { Mutation } from 'dgraph-js-http'

// The prop entity is simple, no need for custom mutations, the default ones will do the job
export class HookMutationFactory extends BaseMutationFactory<IHook> {
  public readonly entityType = DgraphEntityType.Hook

  public readonly nullablePredicates: NullablePredicates<IHook> = []

  private readonly propMutationFactory = new PropMutationFactory()

  override forCreate(entity: IHook, uid?: string) {
    const configUid = entity.config.id || randomBlankNode()

    const configMutation = this.propMutationFactory.forCreate(
      entity.config,
      configUid,
    )

    uid = (uid || entity.id) ?? undefined

    const core: Mutation = {
      setJson: {
        uid,
        'dgraph.type': this.entityType,
        hookType: entity.type,
        tags: [],
        hookConfig: { uid: configUid },
      },
    }

    return mergeMutations(core, configMutation)
  }

  override forUpdate(entity: IHook, oldEntity: IHook): Mutation {
    let mutation = super.forUpdate(entity, oldEntity)

    if (entity.config.id !== entity.config.id) {
      // Delete old config
      mutation = mergeMutations(
        mutation,
        this.propMutationFactory.forDelete(oldEntity.config),
      )
    }

    return mutation
  }

  /** Override this method to delete related entities */
  forDelete(entity: IHook): Mutation {
    const mutation = super.forDelete(entity)
    const deleteConfig = this.propMutationFactory.forDelete(entity.config)

    return mergeMutations(mutation, deleteConfig)
  }
}
