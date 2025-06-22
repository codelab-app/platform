import type { ITagService } from '@codelab/frontend-abstract-application'
import type { ITagModel } from '@codelab/frontend-abstract-domain'
import type {
  ICreateTagData,
  IUpdateTagData,
} from '@codelab/shared-abstract-core'
import type { TagOptions, TagWhere } from '@codelab/shared-infra-gqlgen'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { RoutePaths } from '@codelab/frontend-abstract-application'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { Validator } from '@codelab/shared-infra-typebox'
import { atom, useAtom } from 'jotai'

const checkedTagsAtom = atom<Array<string>>([])

export const useTagService = (): ITagService => {
  const { tagDomainService } = useDomainStore()
  const [checkedTagIds, setCheckedTagIds] = useAtom(checkedTagsAtom)

  const create = async (data: ICreateTagData) => {
    const tag = tagDomainService.hydrate(data)

    await tagRepository.add(data, {
      revalidateTags: [CACHE_TAGS.Tag.list()],
    })

    if (!tag.parent) {
      return tag
    }

    // tag.parent.current.writeCache({
    //   children: [...tag.parent.current.children, tagRef(tag)],
    // })

    tagDomainService.setExpandedNodes([
      ...tagDomainService.expandedNodes,
      tag.parent.id,
    ])

    return tag
  }

  const removeMany = async (ids: Array<ITagModel>) => {
    const tags = await getAll({ id_IN: ids.map(({ id }) => id) })
    const tagsToRemove = []

    // Collect all tags to be removed (including descendants)
    for (const tag of tags) {
      tagsToRemove.push(tag)

      tag.descendants.forEach((descendant) => {
        tagsToRemove.push(descendant)
      })
    }

    // Remove tags from local state before API call to prevent UI flashing
    for (const tag of tagsToRemove) {
      tagDomainService.tags.delete(tag.id)
    }

    return await tagRepository.delete(tagsToRemove, {
      revalidateTags: [CACHE_TAGS.Tag.list()],
    })
  }

  const getAll = async (where?: TagWhere, options?: TagOptions) => {
    const {
      aggregate: { count },
      items: tags,
    } = await tagRepository.find(where, options, {
      tags: [CACHE_TAGS.Tag.list()],
    })

    return tags.map((tag) => {
      tag.children.forEach((child) => tagDomainService.hydrate(child))

      return tagDomainService.hydrate(tag)
    })
  }

  const update = async ({ id, name, parent }: IUpdateTagData) => {
    const tag = tagDomainService.tags.get(id)

    Validator.assertsDefined(tag)

    tag.writeCache({ name, parent })

    await tagRepository.update({ id: tag.id }, tag, {
      revalidateTags: [CACHE_TAGS.Tag.list()],
    })

    return tag
  }

  const deleteCheckedTags = async () => {
    const checkedTags = checkedTagIds
      .map((id) => tagDomainService.tags.get(id))
      .filter((tag): tag is ITagModel => Boolean(tag))

    await removeMany(checkedTags)
    setCheckedTagIds([])
  }

  const createPopover = {
    close: (router: AppRouterInstance) => {
      router.push(RoutePaths.Tag.base())
    },
    open: (router: AppRouterInstance) => {
      router.push(RoutePaths.Tag.create())
    },
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      router.push(RoutePaths.Tag.base())
    },
    open: (router: AppRouterInstance) => {
      router.push(RoutePaths.Tag.base())
    },
  }

  return {
    checkedTagIds,
    create,
    createPopover,
    deleteCheckedTags,
    getAll,
    removeMany,
    setCheckedTagIds,
    update,
    updatePopover,
  }
}
