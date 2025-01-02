import type {
  GetDataFn,
  ITagService,
} from '@codelab/frontend/abstract/application'
import type { ITagModel } from '@codelab/frontend/abstract/domain'
import type {
  ICreateTagData,
  IRef,
  IUpdateTagData,
} from '@codelab/shared/abstract/core'
import type { TagOptions, TagWhere } from '@codelab/shared/infra/gql'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { PageType } from '@codelab/frontend/abstract/types'
import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { tagRef } from '@codelab/frontend-domain-tag/store'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { Validator } from '@codelab/shared/infra/typebox'
import { atom, useAtom } from 'jotai'

const checkedTagsAtom = atom<Array<string>>([])

export const useTagService = (): ITagService => {
  const {
    pagination: { tagPagination },
  } = useApplicationStore()

  const { tagDomainService } = useDomainStore()
  const [checkedTagIds, setCheckedTagIds] = useAtom(checkedTagsAtom)

  const getDataFn: GetDataFn<ITagModel> = async (
    page,
    pageSize,
    filter,
    search,
  ) => {
    const {
      aggregate: { count: totalItems },
      items,
    } = await tagRepository.find(
      {
        ...graphqlFilterMatches(filter, search),
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

  const create = async (data: ICreateTagData) => {
    const tag = tagDomainService.hydrate(data)

    await tagRepository.add(data)

    tagPagination.dataRefs.set(tag.id, tagRef(tag))

    if (!tag.parent) {
      return tag
    }

    tag.parent.current.writeCache({
      children: [...tag.parent.current.children, tagRef(tag)],
    })

    tagDomainService.setExpandedNodes([
      ...tagDomainService.expandedNodes,
      tag.parent.id,
    ])

    return tag
  }

  const removeMany = async (ids: Array<ITagModel>) => {
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

    tagPagination.setTotalItems(count)

    return tags.map((tag) => {
      tag.children.forEach((child) => tagDomainService.hydrate(child))

      return tagDomainService.hydrate(tag)
    })
  }

  const update = async ({ id, name, parent }: IUpdateTagData) => {
    const tag = tagDomainService.tags.get(id)

    Validator.assertsDefined(tag)

    tag.writeCache({ name, parent })

    await tagRepository.update({ id: tag.id }, tag)

    return tag
  }

  const deleteCheckedTags = async () => {
    const checkedTags = checkedTagIds
      .map((id) => tagDomainService.tags.get(id))
      .filter((tag): tag is ITagModel => Boolean(tag))

    await removeMany(checkedTags)
    setCheckedTagIds([])
  }

  const getOneFromCache = (ref: IRef) => {
    return tagDomainService.tags.get(ref.id)
  }

  const getAllFromCache = () => {
    return Array.from(tagDomainService.tags.values())
  }

  const createPopover = {
    close: (router: AppRouterInstance) => {
      router.push(PageType.Tags())
    },
    open: (router: AppRouterInstance) => {
      router.push(PageType.TagsCreate())
    },
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      router.push(PageType.Tags())
    },
    open: (router: AppRouterInstance) => {
      router.push(PageType.Tags())
    },
  }

  return {
    checkedTagIds,
    create,
    createPopover,
    deleteCheckedTags,
    getAll,
    getAllFromCache,
    getDataFn,
    getOneFromCache,
    paginationService: tagPagination,
    removeMany,
    setCheckedTagIds,
    update,
    updatePopover,
  }
}
