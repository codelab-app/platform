import type { ITagService } from '@codelab/frontend/abstract/application'
import type { ITagModel } from '@codelab/frontend/abstract/domain'
import type { TagOptions, TagWhere } from '@codelab/frontend/infra/gql'
import { useDomainStore } from '@codelab/frontend/infra/mobx'
import { usePaginationService } from '@codelab/frontend-application-shared-store/pagination'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { tagRef } from '@codelab/frontend-domain-tag/store'
import type {
  ICreateTagData,
  IRef,
  IUpdateTagData,
} from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'
import { atom, useAtom } from 'jotai'
import type { Ref } from 'mobx-keystone'

const checkedTagsAtom = atom<Array<Ref<ITagModel>>>([])

export const useTagService = (): ITagService => {
  const { tagDomainService } = useDomainStore()
  const [checkedTags, setCheckedTags] = useAtom(checkedTagsAtom)

  const getDataFn = async (
    page: number,
    pageSize: number,
    filter: { name?: string },
  ) => {
    const {
      aggregate: { count: totalItems },
      items,
    } = await tagRepository.find(
      {
        name_MATCHES: `(?i).*${filter.name ?? ''}.*`,
        parentAggregate: { count: 0 },
      },
      {
        limit: pageSize,
        offset: (page - 1) * pageSize,
      },
    )

    const tags = items.map((tag) => {
      tag.children.forEach((child) => tagDomainService.hydrate(child))

      return tagDomainService.hydrate(tag)
    })

    return { items: tags, totalItems }
  }

  const paginationService = usePaginationService<ITagModel, { name?: string }>(
    'tag',
    getDataFn,
  )

  const create = async (data: ICreateTagData) => {
    const tag = tagDomainService.hydrate(data)

    await tagRepository.add(tag)

    paginationService.dataRefs.set(tag.id, tagRef(tag))

    if (!tag.parent) {
      return tag
    }

    tag.parent.current.writeCache({
      children: [...tag.parent.current.children, tagRef(tag)],
    })

    tagDomainService.setExpandedNodes([
      ...tagDomainService.expandedNodes,
      tag.id,
    ])

    return tag
  }

  const remove = async (ids: Array<IRef>) => {
    const tags = await getAll({ id_IN: ids.map(({ id }) => id) })
    const tagsToRemove = []

    for (const tag of tags) {
      tagDomainService.tags.delete(tag.id)
      tagsToRemove.push(tag)

      tag.descendants.forEach((descendant) => {
        tagsToRemove.push(descendant)
        tagDomainService.tags.delete(descendant.id)
      })
    }

    return await tagRepository.delete(tagsToRemove)
  }

  const getAll = async (where?: TagWhere, options?: TagOptions) => {
    const {
      aggregate: { count },
      items: tags,
    } = await tagRepository.find(where, options)

    paginationService.totalItems = count

    return tags.map((tag) => {
      tag.children.forEach((child) => tagDomainService.hydrate(child))

      return tagDomainService.hydrate(tag)
    })
  }

  const update = async ({ id, name, parent }: IUpdateTagData) => {
    const tag = tagDomainService.tags.get(id)

    assertIsDefined(tag)

    tag.writeCache({ name, parent })

    await tagRepository.update(tag)

    return tag
  }

  const deleteCheckedTags = async () => {
    const tagsToDelete = checkedTags.map((ref) => ({
      id: ref.current.id,
    }))

    await remove(tagsToDelete)
    setCheckedTags([])
  }

  return {
    checkedTags,
    create,
    deleteCheckedTags,
    getAll,
    remove,
    setCheckedTags,
    update,
  }
}
